import { useMemo, useState } from 'react';
import { ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { ShaderMaterial, Vector2, WebGLRenderTarget } from 'three';
import { ColumnGradientMaterial } from './ColumnGradientTexture';

const VRTX_SHADER = `
    varying vec2 vUv;
    void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
        vUv = uv;
    }
`;

const DISP_FRAG_SAHDER = `
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    varying vec2 vUv;
    uniform float columns;

    void main() {
        vec2 uv = vUv;
        vec2 mouse = (uMouse + 1.0) / 2.0; // Normalizing mouse coordinates to range [0, 1]

        // Calculate column width and position
        float columnWidth = 1.0 / columns;
        float columnPosition = mod(uv.x, columnWidth) / columnWidth;

        // Calculate the distance from the mouse to each column position
        float distToMouse = distance(vec2(columnPosition, uv.y), mouse);

        // Use the distance to control the color gradient
        vec3 color = vec3(columnPosition * distToMouse);

        gl_FragColor = vec4(color, 1.0);
    }
`;

const FRAG_SHADER = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;
    uniform float u_columns;
    uniform float u_glow;
    uniform float u_mouse_velocity;

    #define WARP false
    #define BALLS 12.
    #define CONTRAST 1.8
    #define GLOW 0.6
    #define ORB_SIZE 0.6
    #define PI 3.14159265359

    vec2 columnGradient(vec2 uv, vec2 mouse, float columns) {
        mouse = (mouse + 1.0) / 2.0; // Normalizing mouse coordinates to range [0, 1]

        // Calculate column width and position
        float columnWidth = 1.0 / columns;
        float columnPosition = mod(uv.x, columnWidth) / columnWidth;

        // Calculate the distance from the mouse to each column position
        float distToMouse = distance(vec2(columnPosition, uv.y), mouse);

        // Use the distance to control the color gradient
        return vec2(columnPosition * distToMouse);

        //vec2 n_mouse = (mouse + 1.0) / 2.0;
        //float columnWidth = 1.0 / columns;
        //float columnPosition = mod(uv.x, columnWidth) / columnWidth;
        //float distToMouse = distance(uv, n_mouse);
        //return vec2(columnPosition * distToMouse);
    }

    vec2 kale(vec2 uv, vec2 offset, float splits) {
        float angle = atan(uv.y, uv.x);
        angle = ((angle / PI) + 1.0) * 0.5;
        angle = mod(angle, 1.0 / splits) * splits;
        angle = -abs(2.0 * angle - 1.0) + 1.0;
        float y = length(uv);
        angle = angle * (y);
        return vec2(angle, y) - offset;
    }

    vec3 colorSw(float num) {
        //vec3 a = vec3(1.000, 1.000, 0.200); // yellow (blue complementary)
        //vec3 b = vec3(0.722, 0.945, 1.000); // cyan   (orange complementary)
        //vec3 c = vec3(0.753, 1.000, 0.620); // green  (violet complementary)

        vec3 a = vec3(1.000, 1.000, 0.000);
        vec3 b = vec3(0.522, 1.000, 1.000);
        vec3 c = vec3(0.753, 1.000, 0.720);

        //vec3 a = vec3(0.968,1.000,0.141); // yellow (blue complementary)
        //vec3 b = vec3(0.295,0.805,0.751); // cyan   (orange complementary)
        //vec3 c = vec3(0.300,0.981,1.000); // blue  (orange complementary)

        // Use modulo operation to decide the color
        int modValue = int(mod(num, 4.0));

        if (modValue == 0 || modValue == 1) {
            return a; // a color is chosen 50% of the time
        } else if (modValue == 2) {
            return b; // b color is chosen 25% of the time
        } else {
            return c; // c color is chosen 25% of the time
        }
    }

    vec2 fluidDistortion(vec2 uv, vec2 mouse, vec2 velocity, float strength) {
        float dist = distance(uv, mouse);
        vec2 dir = normalize(velocity);
        float wave = exp(-dist * 10.0) * strength;
        uv += wave * dir;
        uv -= wave * dir * 0.5;
        return uv;
    }

    void main(){ 
        vec2 uv = 2.0 * gl_FragCoord.xy / u_resolution.xy - 1.0;
        uv.x *= u_resolution.x / u_resolution.y;
        uv *= 2.0;

        vec3 color = vec3(0.0);

        vec2 mouse = u_mouse * 2.0;
        mouse.x *= u_resolution.x / u_resolution.y;

        float dist = distance(uv, mouse);

        //uv += fluidDistortion(uv, u_mouse, u_mouse_velocity, 1.0);
        uv += columnGradient(uv, u_mouse, u_columns);
        uv = uv - mouse;

        for (float i = 0.; i < BALLS; i++) {
            float t = u_time/2. - i * PI / BALLS * cos(u_time / max(i, 0.0001));
            vec2 p = vec2(cos(t), sin(t)) / sin(i / BALLS * PI / dist + u_time);
            vec3 c = cos(colorSw(i) * PI * 2.7 / PI + PI * (0.0 / (i + 1.) / 5.)) * (u_glow) + (u_glow);
            color += vec3(dist * .35 / length(uv - p * ORB_SIZE) * c);
        }

        gl_FragColor = vec4(pow(color, vec3(CONTRAST)), 1.0);
    }
`;

interface DisplacementGeometryProps {
    easingFactor: number;
    columns: number;
    glow: number;
}

export const DisplacementGeometry: React.FC<DisplacementGeometryProps> = ({ columns, glow, easingFactor }) => {
    const { viewport, size } = useThree();

    const [currentMouse, setCurrentMouse] = useState(new Vector2());
    const [targetMouse, setTargetMouse] = useState(new Vector2());

    //const displacementTexture = useMemo(() => ColumnGradientMaterial(viewport.width, viewport.height, columns), [viewport, columns]);

    const shaderMaterial = useMemo(() => new ShaderMaterial({
        uniforms: {
            u_time: { value: 0 },
            u_mouse: { value: new Vector2() },
            u_mouse_velocity: { value: new Vector2() },
            u_resolution: { value: new Vector2(size.width * viewport.dpr, size.height * viewport.dpr) },
            u_columns: { value: columns },
            u_glow: { value: glow },
        },
        vertexShader: VRTX_SHADER,
        fragmentShader: FRAG_SHADER,
    }), [viewport, size, columns, glow]);

    const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
        if (event.intersections.length > 0) {
            const uv = event.intersections[0].uv;

            if (uv) {
                const normalizedMouseX = uv.x * 2 - 1;
                const normalizedMouseY = uv.y * 2 - 1;
                setTargetMouse(new Vector2(normalizedMouseX, normalizedMouseY));
            }
        }
    };

    useFrame((state) => {
        //displacementTexture.uniforms.uMouse.value.set(state.pointer.x, state.pointer.y);

        // Smoothly update the current mouse position
        const newMouseX = currentMouse.x + (targetMouse.x - currentMouse.x) * easingFactor;
        const newMouseY = currentMouse.y + (targetMouse.y - currentMouse.y) * easingFactor;
        const newMouse = new Vector2(newMouseX, newMouseY);
        setCurrentMouse(newMouse);

        //const velocity = newMouse.clone().sub(currentMouse).multiplyScalar(1 / state.clock.getElapsedTime());

        //shaderMaterial.uniforms.u_mouse_velocity.value.set(velocity.x, velocity.y);
        shaderMaterial.uniforms.u_mouse.value.set(currentMouse.x, currentMouse.y);
        shaderMaterial.uniforms.u_time.value = state.clock.getElapsedTime();

        //console.log(state.pointer)
    });

    return (
        <mesh scale={[viewport.width, viewport.height, 1]} onPointerMove={handlePointerMove}>
            <planeGeometry args={[1, 1, 1, 1]} />
            <primitive object={shaderMaterial} />
        </mesh>
    );
};
