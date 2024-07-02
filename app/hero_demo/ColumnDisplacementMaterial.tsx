import * as THREE from 'three';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { useRef, useMemo, useEffect, useState } from 'react';
import { TextureLoader, DataTexture, NearestFilter, RGBFormat, FloatType, ShaderMaterial } from 'three';

const fragmentShader = `
uniform sampler2D uTexture;
uniform sampler2D uDataTexture;
uniform vec2 uMouse;
uniform vec2 uResolution;
varying vec2 vUv;

void main() {
    vec4 displacement = texture2D(uDataTexture, vUv);
    vec2 mouse = (uMouse / uResolution) * 2.0 - 1.0;
    float distance = length(vUv - mouse);
    vec2 displacedUv = vUv + vec2(0.0, displacement.r * distance);
    vec4 color = texture2D(uTexture, displacedUv);
    gl_FragColor = color;
}
`;

const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

interface DisplacementEffectProps {
    textureUrl: string;
    gridSize: number;
    relaxation: number;
    size: number;
}

const updateDataTexture = (texture: DataTexture, mouse: { x: number, y: number }, size: number, gridSize: number, relaxation: number) => {
    const data = texture.image.data;
    for (let i = 0; i < data.length; i += 3) {
        data[i] *= relaxation;
        data[i + 1] *= relaxation;
    }

    const gridMouseX = size * mouse.x;
    const gridMouseY = size * (1 - mouse.y);
    const maxDist = size * gridSize;
    const aspect = size / size; // Adjust if needed

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const distance = ((gridMouseX - i) ** 2) / aspect + (gridMouseY - j) ** 2;
            const maxDistSq = maxDist ** 2;

            if (distance < maxDistSq) {
                const index = 3 * (i + size * j);
                let power = maxDist / Math.sqrt(distance);
                power = Math.max(0, Math.min(power, 10));
                data[index] += power;
            }
        }
    }

    texture.needsUpdate = true;
};

export const DisplacementEffect: React.FC<DisplacementEffectProps> = ({ textureUrl, gridSize, relaxation, size }) => {
    const texture = useLoader(TextureLoader, textureUrl);
    const dataTextureRef = useRef<DataTexture>(new DataTexture(new Float32Array(size * size * 3), size, size, RGBFormat, FloatType));

    const { viewport, size: size_t } = useThree();

    const height = size_t.height * viewport.dpr;
    const width = size_t.width * viewport.dpr;

    const material = useMemo(() => new ShaderMaterial({
        uniforms: {
            uTexture: { value: texture },
            uDataTexture: { value: dataTextureRef.current },
            uMouse: { value: new THREE.Vector2() },
            uResolution: { value: new THREE.Vector2(width, height) },
        },
        vertexShader,
        fragmentShader,
    }), [texture, width, height]);

    useEffect(() => {
        const dataTexture = dataTextureRef.current;
        dataTexture.magFilter = dataTexture.minFilter = NearestFilter;
        dataTexture.needsUpdate = true;
    }, [size]);

    useFrame((state) => {
        const { pointer } = state;
        updateDataTexture(dataTextureRef.current, pointer, size, gridSize, relaxation);
        material.uniforms.uMouse.value.set(pointer.x * width, pointer.y * height);
        material.uniforms.uResolution.value.set(width, height);
    });

    return (
        <mesh material={material}>
            <planeGeometry args={[1, 1]} />
        </mesh>
    );
};
