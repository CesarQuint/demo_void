"use client";

import { Fluid } from "@whatisjery/react-fluid-distortion";
import { EffectComposer } from "@react-three/postprocessing";
import { Canvas } from "@react-three/fiber";
import { useTexture, useVideoTexture } from "@react-three/drei";
import { useConfig } from "@whatisjery/react-fluid-distortion";

const Image = () => {
    const texture = useVideoTexture("/videos/cdmx.mp4");

    return (
        <mesh position-z={-4}>
            <planeGeometry args={[17, 10, 20, 20]} attach="geometry" />
            <meshBasicMaterial map={texture} color="#c4b4d2" />
        </mesh>
    );
};

const page = () => {
    const config = useConfig();
    return (
        <div>
            Hello
            <div style={{ marginTop: "16rem" }}></div>
            <Canvas
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: "100vh",
                    width: "100vw",
                    background: "#000000",
                }}
            >
                <Image />
                <EffectComposer>
                    <Fluid fluidColor={"#000"} />
                </EffectComposer>
            </Canvas>
            ;
        </div>
    );
};

export default page;
