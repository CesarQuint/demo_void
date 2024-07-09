"use client";

import { Canvas } from '@react-three/fiber'
import { useState, useEffect } from 'react';
import { GUI } from 'lil-gui';

import { VortexGeometry } from './VortexGeometry';
//import { DisplacementMaterial } from './DisplacementMaterial';
import { DisplacementGeometry } from './ColumnDisplacementMaterial';
import { CustomCursor } from '../components/cursor';
import { ImagePlane } from './ImagePlane';
import css from '../css/canvas.module.css';

export default function Hero() {
  const [settings, setSettings] = useState({
    easingFactor: 0.05,
    columns: 10,
    glow: 0.15,
  });

  useEffect(() => {
    const gui = new GUI();
    gui.add(settings, 'easingFactor', 0.01, 1.0, 0.01).onChange((value: number) => setSettings((s) => ({ ...s, easingFactor: value })));
    gui.add(settings, 'columns', 0, 32, 2).onChange((value: number) => setSettings((s) => ({ ...s, columns: value })));
    gui.add(settings, 'glow', 0.05, 0.2, 0.01).onChange((value: number) => setSettings((s) => ({ ...s, glow: value })));
    return () => gui.destroy();
  }, []);

  return (
    <div className={css.canvas} style={{ backgroundColor: 'white' }}>
      <CustomCursor />
      <Canvas>
        <DisplacementGeometry columns={settings.columns} glow={settings.glow} easingFactor={settings.easingFactor} />
      </Canvas>
    </div>
  );
}
