import { useVideoTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react";
import { ShaderMaterial, OrthographicCamera, Vector2 } from "three";

type ImageProps = {
    videoRef: React.MutableRefObject<HTMLVideoElement | null>;
    source: string;
    thumbnailSrc?: string;
    isPlaying: boolean;
};

const ImageThree: React.FC<ImageProps> = ({
    videoRef,
    source,
    thumbnailSrc,
    isPlaying,
}) => {
    const texture = useVideoTexture(source, {
        muted: true,
        crossOrigin: "anonymous",
    });
    const thumbnailTexture = useVideoTexture(thumbnailSrc ?? null, {
        muted: true,
        crossOrigin: "anonymous",
    });

    const { camera, size } = useThree();
    const [dimensions, setDimensions] = useState({ width: 1, height: 1 });

    useEffect(() => {
        const handleResize = () => {
            if (!(camera instanceof OrthographicCamera)) return;

            const aspectRatio = size.width / size.height;
            const planeWidth = (camera.right - camera.left) * 0.85;
            const planeHeight = planeWidth / aspectRatio;

            setDimensions({ width: planeWidth, height: planeHeight });
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [size.width, size.height]);

    useEffect(() => {
        if (texture?.image instanceof HTMLVideoElement) {
            videoRef.current = texture.image;
            videoRef.current.pause();
        }
    }, [texture, videoRef]);

    const material = useMemo(() => {
        return new ShaderMaterial({
            uniforms: {
                u_texture: { value: texture },
                u_thumbnailTexture: { value: thumbnailTexture },
                u_hasThumbnail: { value: Boolean(thumbnailSrc) },
                u_fade: { value: isPlaying },
                u_radius: { value: 30.0 },
                u_size: {
                    value: new Vector2(size.width - 500, size.height - 500),
                },
            },
            vertexShader: `
                varying vec2 vUv;

                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                precision highp float;
                varying vec2 vUv;
                uniform sampler2D u_texture;
                uniform sampler2D u_thumbnailTexture;
                uniform float u_hasThumbnail;
                uniform float u_fade;
                uniform float u_radius;
                uniform vec2 u_size;

                float roundedRectSDF(vec2 p, vec2 size, float radius) {
                    vec2 aspect = vec2(1.0, size.y / size.x);
                    vec2 d = abs(p * aspect) - (size - radius);
                    return length(max(d, 0.0)) - radius;
                }

                void main() {
                    vec2 uv = vUv * 2.0 - 1.0;
                    uv.x *= (u_size.x / u_size.y);

                    float distance = roundedRectSDF(uv, u_size, u_radius);
                    
                    if (distance > 0.0) discard;

                    vec4 videoColor = texture2D(u_texture, vUv);
                    vec4 thumbnailColor = mix(vec4(0.0, 0.0, 0.0, 0.0), texture2D(u_thumbnailTexture, vUv), u_hasThumbnail);
                    vec4 color = mix(thumbnailColor, videoColor, u_fade);
                    color.rgb = pow(color.rgb, vec3(2.2));
                    gl_FragColor = color;
                }
            `,
        });
    }, [
        size.width,
        size.height,
        texture,
        isPlaying,
        thumbnailTexture,
        thumbnailSrc,
    ]);

    return (
        <mesh position-z={-4}>
            <planeGeometry
                args={[dimensions.width, dimensions.height, 20, 20]}
                attach="geometry"
            />
            <primitive object={material} attach="material" />
        </mesh>
    );
};

export default ImageThree;
