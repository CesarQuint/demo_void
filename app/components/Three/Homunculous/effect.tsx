//!Effect Area
"use client";
import { useControls } from "leva";
import { useRef, useEffect } from "react";
import { extend, useThree, useFrame } from "@react-three/fiber";
import { EffectComposer, RenderPass } from "three-stdlib";

import { DistortionPass } from "./distortionPss";
import { RipplePass } from "./ripplePass";

extend({ EffectComposer, RenderPass });

export const Effect: React.FC = () => {
  const dist_datas = useControls("Distortion", {
    enabled: true,
    progress: { value: 0, min: 0, max: 1, step: 0.01 },
    scale: { value: 1, min: 0, max: 5, step: 0.01 },
  });

  const ripple_datas = useControls("Ripple", {
    enabled: true,
  });

  const composerRef = useRef<EffectComposer>(null);
  const { gl, scene, camera, size } = useThree();

  useEffect(() => {
    console.log(gl, scene, camera, size);

    composerRef.current!.setSize(size.width, size.height);
  }, []);

  useFrame(() => {
    if (composerRef.current !== null) {
      console.log("dsds");
    }
  });

  return (
    <effectComposer
      ref={composerRef}
      args={[gl]}>
      <renderPass args={[scene, camera]} />
      {/* <DistortionPass {...dist_datas} /> */}
      <RipplePass {...ripple_datas} />
    </effectComposer>
  );
};
