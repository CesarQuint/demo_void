import React from "react";
import { MeshProps } from "@react-three/fiber";

interface FloorProps extends MeshProps {
    position?: [number, number, number];
}

function Floor(props: FloorProps) {
    return (
        <mesh {...props} receiveShadow>
            <boxGeometry args={[20, 1, 10]} />
            <meshPhysicalMaterial color="white" />
        </mesh>
    );
}

export default Floor;
