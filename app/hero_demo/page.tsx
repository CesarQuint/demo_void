"use client";

import { Canvas } from '@react-three/fiber'
import { useState, useEffect } from 'react';
import { GUI } from 'lil-gui';

import { VortexGeometry } from './VortexGeometry';
//import { DisplacementMaterial } from './DisplacementMaterial';
import { DisplacementEffect } from './ColumnDisplacementMaterial';
import css from '../css/canvas.module.css';

export default function Hero() {
    const [settings, setSettings] = useState({
        size: 34,
        //mouse: 0.25,
        strength: 1,
        relaxation: 0.9,
    });

    useEffect(() => {
        const gui = new GUI();
        gui.add(settings, 'size', 2, 1000, 1).onChange((value: number) => setSettings((s) => ({ ...s, grid: value })));
        //gui.add(settings, 'strength', 0, 1, 0.01).onChange((value: number) => setSettings((s) => ({ ...s, strength: value })));
        //gui.add(settings, 'relaxation', 0, 1, 0.01).onChange((value: number) => setSettings((s) => ({ ...s, relaxation: value })));
        return () => gui.destroy();
    }, []);

    return (
        <div className={css.canvas}>
            <Canvas>
                <VortexGeometry />
                {/*
                <DisplacementMaterial
                    size={settings.size}
                    strength={settings.strength}
                    relaxation={settings.relaxation}
                />
                */}

                {/*

                <DisplacementEffect
                    textureUrl="https://images.unsplash.com/photo-1618005198920-f0cb6201c115?q=80&w=3000&auto=format"
                    gridSize={32}
                    relaxation={0.9}
                    size={settings.size}
                />

                */}
            </Canvas>
        </div>
    );
}
