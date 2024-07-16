"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
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
    }
`;

const FlowmapMesh = ({ imageURL }: { imageURL: string }) => {
  const { size, viewport } = useThree();
  const [mouse, setMouse] = useState(new THREE.Vector2(-1, -1));
  const [velocity, setVelocity] = useState(new THREE.Vector2(0, 0));
  const aspect = size.width / size.height;
  const texture = useLoader(THREE.TextureLoader, imageURL);

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      tMap: { value: null },
      uFalloff: { value: 0.5 },
      uAlpha: { value: 1.0 },
      uDissipation: { value: 0.98 },
      uMouse: { value: new THREE.Vector2(-1, -1) },
      uAspect: { value: 1.0 },
      uVelocity: { value: new THREE.Vector2(0, 0) },
    },
    vertexShader: VRTX_SHADER,
    fragmentShader: FRAG_SHADER
  })

  useFrame(({ clock, pointer }) => {
    // Calculate velocity
    const newVelocity = new THREE.Vector2(
      mouse.x - shaderMaterial.uniforms.uMouse.value.x,
      mouse.y - shaderMaterial.uniforms.uMouse.value.y
    );

    // Update shader uniforms
    shaderMaterial.uniforms.uMouse.value.set(pointer.x, pointer.y);
    shaderMaterial.uniforms.uVelocity.value = newVelocity;
    shaderMaterial.uniforms.uAspect.value = aspect;

    // Optionally, you can smooth the velocity change
    setVelocity(newVelocity);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <primitive object={shaderMaterial} />
    </mesh>
  );
};

function ImageFlowmap({ imageUrl }: { imageUrl: string }) {
  const mesh = useRef();
  const { gl, viewport, size } = useThree();
  const texture = useLoader(THREE.TextureLoader, imageUrl);
  const flowmapTexture = useRef(new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight));
  const [mouse, setMouse] = useState(new THREE.Vector2(-1));
  const [velocity, setVelocity] = useState(new THREE.Vector2());
  const [lastMouse, setLastMouse] = useState(new THREE.Vector2());
  const [lastTime, setLastTime] = useState<number>(0);
  const renderer = new Renderer({ dpr: 2 });

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uResolution: { value: new THREE.Vector2(size.width * viewport.dpr, size.height * viewport.dpr) },
      uMouse: { value: new THREE.Vector2() },
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

    setMouse(new THREE.Vector2(x / size.width, 1 - y / size.height));

    if (lastTime === null) {
      setLastTime(performance.now());
      setLastMouse(new THREE.Vector2(x, y));
      return;
    }

    const deltaX = x - lastMouse.x;
    const deltaY = y - lastMouse.y;
    const time = performance.now();
    const delta = Math.max(14, time - lastTime);

    setVelocity(new THREE.Vector2(deltaX / delta, deltaY / delta));
    setLastMouse(new THREE.Vector2(x, y));
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
  return (
    <Canvas style={{ height: '100vh' }}>
      <FlowmapMesh imageURL="https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1920&auto=format" />
    </Canvas>
  );
}
