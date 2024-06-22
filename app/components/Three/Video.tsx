import React, { useEffect, useRef, useState } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import {
  TextureLoader,
  VideoTexture,
  PlaneGeometry,
  MeshBasicMaterial,
} from "three";
import css from "../../css/home.module.css";

import { EffectComposer, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

type Props = {};

extend({ PlaneGeometry, MeshBasicMaterial });

function Plane() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoTexture, setVideoTexture] = useState<VideoTexture | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const video = document.createElement("video");
    video.src = "/videos/cdmx.mp4"; // Path to your video
    video.crossOrigin = "Anonymous";
    video.loop = false;
    video.muted = true;
    video.play();

    videoRef.current = video;

    const texture = new VideoTexture(video);
    setVideoTexture(texture);

    return () => {
      video.pause();
      video.src = "";
      setVideoTexture(null);
    };
  }, []);

  if (!videoTexture) {
    return null;
  }

  return (
    <mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}>
      <planeGeometry args={[7, 10, 10]} />
      <meshBasicMaterial map={videoTexture} />
      {hovered && (
        <EffectComposer>
          <Noise
            blendFunction={BlendFunction.COLOR_DODGE} // blend mode
            opacity={1.5} // noise effect intensity (between 0 and 1)
            premultiply // set to true to fix black borders on bright objects
          />
        </EffectComposer>
      )}
    </mesh>
  );
}

const Video = (props: Props) => {
  return (
    <div className={css.scene}>
      <Canvas className={css.canvas}>
        <ambientLight
          color={"white"}
          intensity={0.8}
        />
        <Plane />
      </Canvas>
    </div>
  );
};

export default Video;
