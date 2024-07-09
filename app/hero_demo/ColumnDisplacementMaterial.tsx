import { useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector2, WebGLRenderTarget } from 'three';
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

const DISP_FRAG_SHADER = `
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    varying vec2 vUv;
    uniform float columns;

    void main() {
        vec2 uv = vUv;
        vec2 mouse = (uMouse + 1.0) / 2.0;
        float columnWidth = 1.0 / columns;
        float columnPosition = mod(uv.x, columnWidth) / columnWidth;
        float distToMouse = distance(uv, mouse);
        vec3 color = vec3(columnPosition * distToMouse);
        gl_FragColor = vec4(color, 1.0);
    }
`;

const MAIN_FRAG_SHADER = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;
    uniform float u_columns;
    uniform float u_glow;
    varying vec2 vUv;

    #define WARP false
    #define BALLS 12.
    #define CONTRAST 1.8
    #define GLOW 0.6
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
        vec3 a = vec3(1.000, 1.000, 0.200); // yellow (blue complementary)
        vec3 b = vec3(0.722, 0.945, 1.000); // cyan   (orange complementary)
        vec3 c = vec3(0.753, 1.000, 0.620); // green  (violet complementary)

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

    void main(){ 
        vec2 uv = vUv;

        vec3 color = vec3(0.0);

        vec2 mouse = vec2(u_mouse.x, 0.0);

        float dist = distance(uv, mouse);
        uv = WARP ? uv * kale(uv - mouse, vec2(0.0), 2.0) : uv - mouse;

        for (float i = 0.; i < BALLS; i++) {
            float t = u_time/2. - i * PI / BALLS * cos(u_time / max(i, 0.0001));
            vec2 p = vec2(cos(t), sin(t)) / sin(i / BALLS * PI / dist + u_time);
            vec3 c = cos(colorSw(i) * PI * 2.7 / PI + PI * (0.0 / (i + 1.) / 5.)) * (GLOW) + (GLOW);
            color += vec3(dist * .35 / length(uv - p * ORB_SIZE) * c);
        }

        gl_FragColor = vec4(pow(color, vec3(CONTRAST)), 1.0);
    }
`;

const FINAL_FRAG_SHADER = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform sampler2D u_main;
    uniform sampler2D u_displacement;
    varying vec2 vUv;

    void main() {
        vec2 uv = vUv;
        vec3 displacement = texture2D(u_displacement, uv).rgb;
        uv += displacement.xy * 0.1; // Adjust the displacement strength as needed
        vec3 color = texture2D(u_main, uv).rgb;
        //gl_FragColor = vec4(color, 1.0);
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;

interface DisplacementGeometryProps {
    columns: number;
    glow: number;
}

export const DisplacementGeometry: React.FC<DisplacementGeometryProps> = ({ columns, glow }) => {
    const { gl, size, viewport } = useThree();
    const mainRenderTarget = useMemo(() => new WebGLRenderTarget(size.width, size.height), [size]);
    const displacementRenderTarget = useMemo(() => new WebGLRenderTarget(size.width, size.height), [size]);
    const scene = useMemo(() => new Scene(), []);
    const camera = useMemo(() => {
        const cam = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        cam.position.z = 1;
        return cam;
    }, []);

    //const displacementTexture = useMemo(() => ColumnGradientMaterial(viewport.width, viewport.height, columns), [viewport, columns]);

    //const shaderMaterial = useMemo(() => new ShaderMaterial({
    //uniforms: {
    //u_time: { value: 0 },
    //u_mouse: { value: new Vector2() },
    //u_resolution: { value: new Vector2(size.width * viewport.dpr, size.height * viewport.dpr) },
    //u_displacement: { value: renderTarget.texture },
    //u_columns: { value: columns },
    //u_glow: { value: glow }
    //},
    //vertexShader: VRTX_SHADER,
    //fragmentShader: FRAG_SHADER,
    //}), [viewport, size, columns, glow]);

    const mainMaterial = useMemo(() => new ShaderMaterial({
        uniforms: {
            u_resolution: { value: new Vector2(size.width * viewport.dpr, size.height * viewport.dpr) },
            u_mouse: { value: new Vector2() },
            u_time: { value: 0 },
            u_columns: { value: columns }
        },
        vertexShader: VRTX_SHADER,
        fragmentShader: MAIN_FRAG_SHADER,
    }), [size, viewport, columns]);

    const displacementMaterial = useMemo(() => new ShaderMaterial({
        uniforms: {
            uResolution: { value: new Vector2(size.width * viewport.dpr, size.height * viewport.dpr) },
            uMouse: { value: new Vector2() },
            columns: { value: columns }
        },
        vertexShader: VRTX_SHADER,
        fragmentShader: DISP_FRAG_SHADER,
    }), [size, viewport, columns]);

    const finalMaterial = useMemo(() => new ShaderMaterial({
        uniforms: {
            u_resolution: { value: new Vector2(size.width * viewport.dpr, size.height * viewport.dpr) },
            u_mouse: { value: new Vector2() },
            u_main: { value: mainRenderTarget.texture },
            u_displacement: { value: displacementRenderTarget.texture }
        },
        vertexShader: VRTX_SHADER,
        fragmentShader: FINAL_FRAG_SHADER,
    }), [size, viewport, mainRenderTarget.texture, displacementRenderTarget.texture]);

    //useFrame((state) => {
    //displacementTexture.uniforms.uMouse.value.set(state.pointer.x, state.pointer.y);
    //shaderMaterial.uniforms.u_mouse.value.set(state.pointer.x, state.pointer.y);
    //shaderMaterial.uniforms.u_time.value = state.clock.getElapsedTime();

    //gl.setRenderTarget(renderTarget);
    //gl.clear();
    //gl.render(new Mesh(new PlaneGeometry(1, 1, 1, 1), displacementTexture), state.camera);
    //gl.setRenderTarget(null);
    //});

    useFrame((state) => {
        const { clock, pointer } = state;

        // Update uniforms
        mainMaterial.uniforms.u_time.value = clock.getElapsedTime();
        mainMaterial.uniforms.u_mouse.value.set(pointer.x, pointer.y);
        displacementMaterial.uniforms.uMouse.value.set(pointer.x, pointer.y);
        finalMaterial.uniforms.u_mouse.value.set(pointer.x, pointer.y);

        // Create temporary scene and camera for rendering to textures
        const tempScene = new Scene();
        const tempCamera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        tempCamera.position.z = 1;

        // Render main shader to main render target
        tempScene.add(new Mesh(new PlaneGeometry(1, 1), mainMaterial));
        gl.setRenderTarget(mainRenderTarget);
        gl.clear();
        gl.render(tempScene, tempCamera);

        // Clear scene for next rendering
        //tempScene.clear();

        // Render displacement shader to displacement render target
        tempScene.add(new Mesh(new PlaneGeometry(1, 1), displacementMaterial));
        gl.setRenderTarget(displacementRenderTarget);
        gl.clear();
        gl.render(tempScene, tempCamera);

        // Clear scene for next rendering
        //tempScene.clear();

        // Render final displaced output to the screen
        tempScene.add(new Mesh(new PlaneGeometry(2, 2), finalMaterial));
        gl.setRenderTarget(null);
        gl.clear();
        gl.render(tempScene, tempCamera);
    });

    return null;

    //return (
    //<mesh scale={[viewport.width, viewport.height, 1]}>
    //<planeGeometry args={[1, 1, 1, 1]} />
    //<primitive object={shaderMaterial} />
    //</mesh>
    //);
};
