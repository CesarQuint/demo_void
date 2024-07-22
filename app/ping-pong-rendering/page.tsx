"use client";

import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector2, WebGLRenderTarget } from "three";

const VRTX_SHADER = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const FRAG_SHADER = `
    precision highp float;

    uniform sampler2D tMap;
    uniform vec2 uMouse;
    uniform vec2 uResolution;

    varying vec2 vUv;

    void main() {
        vec2 uv = 2.0 * gl_FragCoord.xy / uResolution.xy - 1.0;
        uv.x *= uResolution.x / uResolution.y;

        vec2 mouse = uMouse * 2.0;
        mouse.x *= uResolution.x / uResolution.y;

        float distance = length(uv - mouse);

        // Create a distortion effect based on the distance
        //vec2 distortedUv = vUv + (uMouse - vUv) * 0.1 * exp(-distance * 20.0);

        //vec4 color = texture2D(tMap, distortedUv);

        gl_FragColor = vec4(vec3(distance), 1.0);
    }
`;

const PingPongShader = () => {
  const { gl, size, viewport } = useThree();
  const fbos = useRef(Array(2).fill(new WebGLRenderTarget(size.width, size.height)));
  const currentTarget = useRef(0);

  const scene = useRef(new Scene());
  const camera = useRef(new OrthographicCamera(
    size.width / -2, size.width / 2,
    size.height / 2, size.height / -2,
    0.1, 10
  ));
  camera.current.position.z = 1;

  const shaderMaterial = useRef(new ShaderMaterial({
    uniforms: {
      tMap: { value: fbos.current[currentTarget.current].texture },
      uMouse: { value: new Vector2() },
      uResolution: { value: new Vector2(size.width, size.height) },
    },
    vertexShader: VRTX_SHADER,
    fragmentShader: FRAG_SHADER,
  }));

  //useEffect(() => {
  //const geometry = new PlaneGeometry(size.width, size.height);
  //const plane = new Mesh(geometry, shaderMaterial.current);
  //scene.current.add(plane);

  //return () => {
  //shaderMaterial.current.dispose();
  //};
  //}, [size.width, size.height]);

  useFrame(({ pointer }) => {
    shaderMaterial.current.uniforms.uMouse.value.set(pointer.x, pointer.y);

    //const nextTarget = 1 - currentTarget.current;
    //shaderMaterial.current.uniforms.tMap.value = fbos.current[currentTarget.current].texture;

    //gl.setRenderTarget(fbos.current[nextTarget]);
    //gl.render(scene.current, camera.current);
    //gl.setRenderTarget(null);

    //currentTarget.current = nextTarget;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]} >
      <planeGeometry args={[1, 1, 1, 1]} />
      <primitive object={shaderMaterial.current} />
    </mesh>
  );
};

export default function PingPongExample() {
  return (
    <Canvas style={{ height: '100vh' }}>
      <PingPongShader />
    </Canvas>
  );
}
