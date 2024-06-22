/// <reference types="three" />

import React, { useRef, useEffect } from "react";
import { BoxGeometry, Mesh, MeshPhysicalMaterial } from "three";
import { extend, useFrame } from "@react-three/fiber";

extend({ BoxGeometry, MeshPhysicalMaterial });

interface BoxProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  rotateX?: number;
  rotateY?: number;
}

const Box: React.FC<BoxProps> = ({
  position,
  rotation,
  rotateX = 0,
  rotateY = 0,
}) => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotateX;
      meshRef.current.rotation.y = rotateY;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      receiveShadow={true}
      castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial color="red" />
    </mesh>
  );
};

export default Box;
