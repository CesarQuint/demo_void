import { DataTexture, ShaderMaterial, RGBFormat, FloatType, NearestFilter, Vector4 } from "three";
import { Size, Viewport, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from "@react-three/drei";
import { useMemo, useRef, useEffect } from "react";

const TEXTURE_IMG = 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1920';

type DisplacementMaterialProps = {
    size: number,
    strength: number,
    relaxation: number,
}

const VRTX_SAHDER = `
    varying vec2 vUv;

    void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
        vUv = uv;
    }
`;

const FRAG_SHADER = `
    uniform float u_time;
    uniform sampler2D u_data_texture;
    uniform sampler2D u_texture;

    varying vec2 vUv;
    varying vec3 vPosition;
    uniform vec4 u_resolution;

    void main()	{
        vec4 displacement = texture2D(u_data_texture, vUv);

        // Apply displacement based on the Y-coordinate to create vertical lines
        vec2 displacedUv = vUv + vec2(0.0, displacement.r);

        vec4 color = texture2D(u_texture, displacedUv);
        gl_FragColor = color;
    }
`;

const clamp = (num: number, min: number, max: number) => Math.max(min, Math.min(num, max));

type TextureProperties = { texture: DataTexture, pointer: { x: number, y: number }, material_props: DisplacementMaterialProps, size: Size };

const updateDataTexture = ({ texture, pointer, material_props: { size, strength, relaxation }, size: { width, height } }: TextureProperties): DataTexture => {
    const data = texture.image.data;

    for (let i = 0; i < data.length; i += 3) {
        data[i] *= relaxation;
        data[i + 1] *= relaxation;
    }

    const gridMouseX = size * pointer.x;
    const gridMouseY = size * (1 - pointer.y);
    const maxDist = size;
    const aspect = height / width;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const distance = ((gridMouseX - i) ** 2) / aspect + (gridMouseY - j) ** 2;
            const maxDistSq = maxDist ** 2;

            if (distance < maxDistSq) {
                const index = 3 * (i + size * j);
                let power = maxDist / Math.sqrt(distance);
                power = clamp(power, 0, 10);

                data[index] += strength * 100 * pointer.x * power;
                data[index + 1] -= strength * 100 * pointer.y * power;
            }
        }
    }

    texture.needsUpdate = true;

    return texture;
};

export const DisplacementMaterial: React.FC<DisplacementMaterialProps> = (props: DisplacementMaterialProps) => {
    const { size } = useThree();
    const texture = useTexture(TEXTURE_IMG);
    const dataTextureRef = useRef(new DataTexture(new Float32Array(Math.pow(props.size, 2) * 3), size.width, size.height, RGBFormat, FloatType));

    useEffect(() => {
        const dataTexture = dataTextureRef.current;
        dataTexture.magFilter = dataTexture.minFilter = NearestFilter;
        dataTexture.needsUpdate = true;
    }, [props.size]);


    useFrame((state, delta) => {
        updateDataTexture({
            texture: dataTextureRef.current,
            pointer: state.pointer,
            material_props: props,
            size
        });

        material.uniforms.u_time.value += delta;
    });

    const material = useMemo(() => {
        return new ShaderMaterial({
            uniforms: {
                u_time: { value: 0 },
                u_texture: { value: texture },
                u_resolution: { value: new Vector4() },
                u_data_texture: { value: dataTextureRef.current },
            },
            vertexShader: VRTX_SAHDER,
            fragmentShader: FRAG_SHADER,
        });
    }, [texture]);


    return (
        <mesh material={material}>
            <planeGeometry args={[1, 1, 1, 1]} />
        </mesh>
    );
};
