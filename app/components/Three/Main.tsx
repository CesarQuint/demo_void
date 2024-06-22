import React from "react";
import { Canvas } from "@react-three/fiber";
import Floor from "./Floor";
import Box from "./Box";
import LightBulb from "./Bulb";
import Controls from "./Controls";
import css from "../../css/home.module.css";

export default function Main() {
  return (
    <div className={css.scene}>
      <Canvas
        shadows
        className={css.canvas}
        camera={{
          position: [-6, 7, 7],
        }}>
        <ambientLight
          color={"white"}
          intensity={0.2}
        />
        <LightBulb position={[0, 3, 0]} />
        <Box
          rotateX={3}
          rotateY={0.2}
        />
        <Controls />
        <Floor position={[0, -1, 0]} />
      </Canvas>
    </div>
  );
}
