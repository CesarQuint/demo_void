import React from "react";
import { BoxGeometry, MeshPhysicalMaterial } from "three";
import { extend, useThree, useFrame } from "@react-three/fiber";

extend({ BoxGeometry });

function Floor(props: {}) {
  return (
    <mesh
      {...props}
      receiveShadow>
      <boxGeometry args={[20, 1, 10]} />
      <meshPhysicalMaterial color="white" />
    </mesh>
  );
}

export default Floor;
