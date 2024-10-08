import { Vector2 } from "three";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

type VortexMaterialUniforms = {
    u_time: number;
    u_resolution: Vector2;
};

const VortexMaterial = shaderMaterial(
    {
        u_time: 0,
        u_resolution: new Vector2(),
        //pointer: new Vector2()
    },
    /*glsl*/
    `
    varying vec2 vUv;
    void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
        vUv = uv;
    }
    `,
    /*glsl*/
    `
    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;

    #define WARP true
    #define BALLS 12.
    #define CONTRAST 1.8
    #define GLOW 0.07
    #define ORB_SIZE 0.6
    #define PI 3.14159265359

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

        vec3 a = vec3(0.968,1.000,0.141); // yellow (blue complementary)
        vec3 b = vec3(0.295,0.805,0.751); // cyan   (orange complementary)
        vec3 c = vec3(0.300,0.981,1.000); // blue  (orange complementary)

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

    void main(){ 
        vec2 uv = 2.0 * gl_FragCoord.xy / u_resolution.xy - 1.0;
        uv.x *= u_resolution.x / u_resolution.y;
        uv *= 2.2;

        vec3 color = vec3(0.0);

        float dist = distance(uv, vec2(0.0));    
        uv = WARP ? uv * kale(uv, vec2(0.0), 2.0) : uv;

        //vec2 mouse = 2.0 * u_mouse / u_resolution.xy - 1.0;
        //mouse.x *= u_resolution.x / u_resolution.y;
        //float dist = distance(uv, mouse);
        //uv = WARP ? uv * kale(uv - mouse, vec2(0.0), 2.0) : uv - mouse;

        for (float i = 0.; i < BALLS; i++) {
            float t = u_time/2. - i * PI / BALLS * cos(u_time / max(i, 0.0001));
            vec2 p = vec2(cos(t), sin(t)) / sin(i / BALLS * PI / dist + u_time);
            vec3 c = cos(colorSw(i) * PI * 2.7 / PI + PI * (0.0 / (i + 1.) / 5.)) * (GLOW) + (GLOW);
            color += vec3(dist * .35 / length(uv - p * ORB_SIZE) * c);
        }

        gl_FragColor = vec4(pow(color, vec3(CONTRAST)), 1.0);
    }
    `,
);

extend({ VortexMaterial });

// Declare JSX intrinsic elements
declare global {
    namespace JSX {
        interface IntrinsicElements {
            vortexMaterial: {
                key: string;
                ref: React.RefObject<VortexMaterialUniforms>;
                u_resolution: [number, number];
            };
        }
    }
}

export { VortexMaterial };
