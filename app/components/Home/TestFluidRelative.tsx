import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { Fluid } from "@whatisjery/react-fluid-distortion";

const TestFluidRelative = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();

            // Calculate cursor position relative to the container
            const relativeX = e.clientX - rect.left;
            const relativeY = e.clientY - rect.top;

            // Normalize the cursor position for the full viewport
            const normalizedX = (relativeX / rect.width) * window.innerWidth;
            const normalizedY = (relativeY / rect.height) * window.innerHeight;

            // Update the position of the cursor for the Fluid effect
            const canvas = containerRef.current.querySelector("canvas");
            if (canvas) {
                canvas.style.setProperty("--cursor-x", normalizedX.toString());
                canvas.style.setProperty("--cursor-y", normalizedY.toString());
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: "relative",
                top: 0,
                left: 0,
                height: "100vh",
                width: "100vw",
                background: "#000000",
                overflow: "hidden",
            }}
        >
            <Canvas
                style={{
                    height: "100%",
                    width: "100%",
                }}
            >
                <EffectComposer>
                    <Fluid
                        intensity={4.0}
                        force={1.0}
                        distortion={0.8}
                        curl={4.0}
                        swirl={8}
                        blend={5}
                        fluidColor={"#0080FF"}
                        pressure={0.8}
                        densityDissipation={0.96}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default TestFluidRelative;
