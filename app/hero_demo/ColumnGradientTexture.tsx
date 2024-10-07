import { ShaderMaterial, Vector2 } from "three";

const VRTX_SAHDER = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

//const FRAG_SHADER = `
//uniform vec2 uResolution;
//uniform vec2 uMouse;
//varying vec2 vUv;
//uniform float columns;

//void main() {
//vec2 uv = vUv;
//vec2 mouse = (uMouse + 1.0) / 2.0;
//float columnWidth = 1.0 / columns;
//float columnPosition = mod(uv.x, columnWidth) / columnWidth;
//float distToMouse = distance(uv, mouse);
//vec3 color = vec3(columnPosition * distToMouse);
//gl_FragColor = vec4(color, 1.0);
//}
//`;

const FRAG_SHADER = `
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

export const ColumnGradientMaterial = (
    width: number,
    height: number,
    columns: number,
) => {
    return new ShaderMaterial({
        uniforms: {
            columns: { value: columns },
            uMouse: { value: new Vector2() },
            uResolution: { value: new Vector2(width, height) },
        },
        vertexShader: VRTX_SAHDER,
        fragmentShader: FRAG_SHADER,
    });
};
