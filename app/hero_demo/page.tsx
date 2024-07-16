"use client";

import { Canvas } from '@react-three/fiber'
import { useState, useEffect } from 'react';
import { GUI } from 'lil-gui';

import { DisplacementGeometry } from './ColumnDisplacementMaterial';
import { CustomCursor } from '../components/cursor';
import css from '../css/canvas.module.css';

export default function Hero() {
  const [settings, setSettings] = useState({
    easing_factor: 0.05,
    orb_size: 0.6,
    contrast: 1.8,
    columns: 10,
    glow: 0.15,
    grid: true,
  });

  useEffect(() => {
    const gui = new GUI();
    gui.add(settings, 'orb_size', 0.0, 5.0, 0.1).onChange((value: number) => setSettings((s) => ({ ...s, orb_size: value })));
    gui.add(settings, 'easing_factor', 0.01, 1.0, 0.01).onChange((value: number) => setSettings((s) => ({ ...s, easing_factor: value })));
    gui.add(settings, 'contrast', 0.0, 5.0, 0.2).onChange((value: number) => setSettings((s) => ({ ...s, contrast: value })));
    gui.add(settings, 'columns', 0, 32, 2).onChange((value: number) => setSettings((s) => ({ ...s, columns: value })));
    gui.add(settings, 'glow', 0.05, 0.2, 0.01).onChange((value: number) => setSettings((s) => ({ ...s, glow: value })));
    gui.add(settings, 'grid').onChange((value: number) => setSettings((s) => ({ ...s, grid: Boolean(value) })));
    return () => gui.destroy();
  }, []);

  return (
    <div className={css.canvas} style={{ backgroundColor: 'white' }}>
      <CustomCursor />
      <Canvas>
        <DisplacementGeometry settings={settings} />
      </Canvas>
    </div>
  );
}
