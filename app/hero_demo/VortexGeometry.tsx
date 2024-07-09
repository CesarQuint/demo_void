"use client";

import { useRef } from 'react'
import { Vector3 } from 'three';
import { Canvas, RootState, useFrame, useThree } from '@react-three/fiber'
import { VortexMaterial } from './VortexMaterial';

export function VortexGeometry() {
    const ref = useRef({
        u_time: 0,
        u_resolution: new Vector3(),
        //pointer: new Vector2()
    });

    const { viewport, size } = useThree();

    useFrame((_: RootState, delta: number) => ref.current.u_time += delta);

    return (
        <mesh scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry />
            <vortexMaterial
                ref={ref}
                key={VortexMaterial.key}
                u_resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
            />
        </mesh>
    )
}
