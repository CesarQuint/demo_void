import React from "react";
import { PointLight, SphereGeometry, MeshPhongMaterial } from "three";
import { extend } from "@react-three/fiber";

extend({ PointLight, SphereGeometry, MeshPhongMaterial });

interface LightBulbProps {
  position?: [number, number, number];
}

const LightBulb: React.FC<LightBulbProps> = (props) => {
  return (
    <mesh {...props}>
      <pointLight castShadow />
      <sphereGeometry args={[0.2, 30, 10]} />
      <meshPhongMaterial emissive={"yellow"} />
    </mesh>
  );
};

export default LightBulb;
