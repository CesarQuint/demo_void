"use client";

import React, { useRef, useEffect, useState } from 'react';
import { TextureLoader, WebGLRenderTarget, Vector2, ShaderMaterial } from 'three';
import { Canvas, useThree, useFrame, useLoader, ThreeEvent } from '@react-three/fiber';

const VRTX_SHADER = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const IMG_FRAG_SHADER = `
    precision highp float;
    uniform sampler2D tWater;
    uniform sampler2D tFlow;
    uniform float uTime;
    varying vec2 vUv;

    void main() {
      vec3 flow = texture2D(tFlow, vUv).rgb;
      vec2 uv = gl_FragCoord.xy / 600.0;
      uv += flow.xy * 0.05;
      vec3 tex = texture2D(tWater, uv).rgb;
      tex = mix(tex, flow * 0.5 + 0.5, smoothstep(-0.3, 0.7, sin(uTime)));
      gl_FragColor.rgb = tex;
      gl_FragColor.a = 1.0;
    }
`;

const FRAG_SHADER = `
    precision highp float;
    uniform sampler2D tMap;
    uniform float uFalloff;
    uniform float uAlpha;
    uniform float uDissipation;
    uniform float uAspect;
    uniform vec2 uMouse;
    uniform vec2 uVelocity;
    varying vec2 vUv;

    void main() {
      vec4 color = texture2D(tMap, vUv) * uDissipation;
      vec2 cursor = vUv - uMouse;
      cursor.x *= uAspect;
      vec3 stamp = vec3(uVelocity * vec2(1, -1), 1.0 - pow(1.0 - min(1.0, length(uVelocity)), 3.0));
      float falloff = smoothstep(uFalloff, 0.0, length(cursor)) * uAlpha;
      color.rgb = mix(color.rgb, stamp, vec3(falloff));
      gl_FragColor = color;
      gl_FragColor = vec4(vec3(0.0), 1.0);
    }
`;

type FlowmapGeometrySettings = {
  size: number;
  alpha: number;
  falloff: number;
  dissipation: number;
};

const FlowmapGeometry = ({ imageURL, settings: { alpha, falloff, dissipation } }: { settings: FlowmapGeometrySettings, imageURL: string }) => {
  const { gl, size, viewport } = useThree();
  //const texture = useLoader(TextureLoader, imageURL);
  const currentTarget = useRef(0);
  const renderTargets = useRef([
    new WebGLRenderTarget(size.width, size.height),
    new WebGLRenderTarget(size.width, size.height)
  ]);

  const scene = useRef(new Scene());
  const camera = useRef(new OrthographicCamera(
    size.width / -2, size.width / 2,
    size.height / 2, size.height / -2,
    0.1, 10
  ));
  camera.current.position.z = 1;

  const shaderMaterial = useMemo(() => new ShaderMaterial({
    uniforms: {
      tMap: { value: renderTargets.current[currentTarget.current].texture },
      uAlpha: { value: alpha },
      uMouse: { value: new Vector2() },
      uFalloff: { value: falloff * 0.5 },
      uVelocity: { value: new Vector2() },
      uResolution: { value: new Vector2(size.width * viewport.dpr, size.height * viewport.dpr) },
      uDissipation: { value: dissipation },
    },
    vertexShader: VRTX_SHADER,
    fragmentShader: FRAG_SHADER
  }), [alpha, falloff, dissipation, size.width, size.height, viewport.dpr]);

  useEffect(() => {
    createFBOs();
    initScene();
  }, []);

  const createFBOs = () => {
    for (let i = 0; i < 2; i++) {
      renderTargets.current[i] = new WebGLRenderTarget(size.width, size.height);
    }

    renderTargets.current[0].texture.wrapS = renderTargets.current[0].texture.wrapT = RepeatWrapping;
    renderTargets.current[1].texture.wrapS = renderTargets.current[1].texture.wrapT = RepeatWrapping;
  };

  const initScene = () => {
    const geometry = new PlaneGeometry(2, 2);
    const plane = new Mesh(geometry, shaderMaterial);
    scene.current.add(plane);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderTargets.current.forEach(target => target.setSize(width, height));
      camera.current.left = width / -2;
      camera.current.right = width / 2;
      camera.current.top = height / 2;
      camera.current.bottom = height / -2;
      camera.current.updateProjectionMatrix();
      shaderMaterial.uniforms.uResolution.value.set(width * viewport.dpr, height * viewport.dpr);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [shaderMaterial, viewport.dpr]);

  useFrame(({ pointer }) => {
    const delta = new Vector2().subVectors(pointer, shaderMaterial.uniforms.uMouse.value).multiplyScalar(10);

    // Update shader uniforms
    shaderMaterial.uniforms.uMouse.value.set(pointer.x, pointer.y);
    shaderMaterial.uniforms.uVelocity.value.set(delta.x, delta.y);

    // Swap render targets
    const nextTarget = 1 - currentTarget.current;

    // Update the shader material's texture with the current render target's texture
    shaderMaterial.uniforms.tMap.value = renderTargets.current[currentTarget.current].texture;

    // Render to the next render target
    gl.setRenderTarget(renderTargets.current[nextTarget]);
    gl.render(scene.current, camera.current);
    gl.setRenderTarget(null);

    // Update the current render target
    currentTarget.current = nextTarget;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <primitive object={shaderMaterial} />
    </mesh>
  );
};

function ImageFlowmap({ imageUrl }: { imageUrl: string }) {
  const { gl, viewport, size } = useThree();
  const texture = useLoader(TextureLoader, imageUrl);
  const flowmapTexture = useRef(new WebGLRenderTarget(window.innerWidth, window.innerHeight));
  const [mouse, setMouse] = useState(new Vector2(-1));
  const [velocity, setVelocity] = useState(new Vector2());
  const [lastMouse, setLastMouse] = useState(new Vector2());
  const [lastTime, setLastTime] = useState<number>(0);

  const shaderMaterial = new ShaderMaterial({
    uniforms: {
      uResolution: { value: new Vector2(size.width * viewport.dpr, size.height * viewport.dpr) },
      uMouse: { value: new Vector2() },
      tWater: { value: texture },
      tFlow: { value: null },
      uTime: { value: 0 },
    },
    vertexShader: VRTX_SHADER,
    fragmentShader: FRAG_SHADER,
  });

  useEffect(() => {
    const handleResize = () => {
      flowmapTexture.current.setSize(size.width, size.height);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [size]);

  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    const x = e.pointer.x;
    const y = e.pointer.y;

    setMouse(new Vector2(x / size.width, 1 - y / size.height));

    if (lastTime === null) {
      setLastTime(performance.now());
      setLastMouse(new Vector2(x, y));
      return;
    }

    const deltaX = x - lastMouse.x;
    const deltaY = y - lastMouse.y;
    const time = performance.now();
    const delta = Math.max(14, time - lastTime);

    setVelocity(new Vector2(deltaX / delta, deltaY / delta));
    setLastMouse(new Vector2(x, y));
    setLastTime(time);
  };

  useFrame(({ clock }) => {
    shaderMaterial.uniforms.uTime.value = clock.getElapsedTime();
    shaderMaterial.uniforms.tFlow.value = flowmapTexture.current.texture;
    shaderMaterial.uniforms.uResolution.value.set(size.width, size.height);
    shaderMaterial.uniforms.uMouse.value = mouse;

    //flowmap.aspect = size.width / size.height;
    //flowmap.mouse.copy(mouse);
    //flowmap.velocity.lerp(velocity, velocity.length() ? 0.5 : 0.1);
    //flowmap.update();
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]} onPointerMove={onPointerMove}>
      <planeGeometry args={[size.width, size.height]} />
      <primitive object={shaderMaterial} />
    </mesh>
  );
}

export default function ImageFlow() {
  const [settings, setSettings] = useState({
    alpha: 1,           // opacity of the stamp
    falloff: 0.3,       // size of the stamp, percentage of the size
    dissipation: 0.98,  // affects the speed that the stamp fades. Closer to 1 is slower
  });

  useEffect(() => {
    const gui = new GUI();
    gui.add(settings, 'alpha', 0.0, 1.0, 0.1).onChange((value: number) => setSettings((s) => ({ ...s, alpha: value })));
    gui.add(settings, 'falloff', 0.0, 1.0, 0.1).onChange((value: number) => setSettings((s) => ({ ...s, falloff: value })));
    gui.add(settings, 'dissipation', 0.0, 1.0, 0.001).onChange((value: number) => setSettings((s) => ({ ...s, dissipation: value })));
  }, []);

  return (
    <Canvas style={{ height: '100vh' }}>
      <FlowmapGeometry
        settings={settings}
        imageURL="https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1920&auto=format" />
    </Canvas>
  );
}
