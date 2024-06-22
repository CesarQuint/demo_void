import React from "react";
import { BoxGeometry, MeshPhysicalMaterial } from "three";
import { extend } from "@react-three/fiber";

extend({ BoxGeometry, MeshPhysicalMaterial });

interface BoxProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

const Box: React.FC<BoxProps> = (props) => {
  return (
    <mesh
      {...props}
      receiveShadow={true}
      castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial color="red" />
    </mesh>
  );
};

export default Box;
