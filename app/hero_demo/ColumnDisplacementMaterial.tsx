import { useMemo, useState } from "react";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { ShaderMaterial, Vector2 } from "three";

/**ths */
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

const FRAG_SHADER = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;
    uniform float u_columns;
    uniform float u_glow;
    uniform float u_orb_size;
    uniform float u_mouse_velocity;
    uniform bool u_grid_toggle;
    uniform float u_contrast;

    #define WARP false
    #define BALLS 12.
    #define CONTRAST 3.0
    #define GLOW 0.6
    #define ORB_SIZE 0.7
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
    }

    vec3 colorRand(float num) {
        vec3 white = vec3(1.000, 1.000, 1.000);
        vec3 black = vec3(0.000, 0.000, 0.000);

        // Use modulo operation to decide the color
        int modValue = int(mod(num, 2.0));

        return modValue == 0 ? white : black;
    }

    void main(){ 
        vec2 uv = 2.0 * gl_FragCoord.xy / u_resolution.xy - 1.0;
        uv.x *= u_resolution.x / u_resolution.y;

        vec3 color = vec3(0.0);

        vec2 mouse = u_mouse * 2.0;
        mouse.x *= u_resolution.x / u_resolution.y;

        float dist = distance(uv, vec2(0.0));

        uv += u_grid_toggle ? columnGradient(uv, u_mouse, u_columns) : vec2(0.0);
        uv = uv - mouse;

        for (float i = 0.; i < BALLS; i++) {
            float t = u_time/2. - i * PI / BALLS * cos(u_time / max(i, 0.0001));
            vec2 p = vec2(cos(t), sin(t)) / sin(i / BALLS * PI / dist + u_time);
            vec3 c = cos(colorRand(i) * PI * 2.7 / PI + PI * (0.0 / (i + 1.) / 5.)) * (u_glow) + (u_glow);
            color += vec3(dist * .35 / length(uv - p * u_orb_size) * c);
        }

        gl_FragColor = vec4(pow(color, vec3(u_contrast)), 1.0);
    }
`;

type DisplacementGeometrySettings = {
  easing_factor: number;
  orb_size: number;
  contrast: number;
  columns: number;
  glow: number;
  grid: boolean;
};

export const DisplacementGeometry: React.FC<{
  settings: DisplacementGeometrySettings;
}> = ({
  settings: { contrast, columns, glow, easing_factor, orb_size, grid },
}) => {
  const { viewport, size } = useThree();

  const [currentMouse, setCurrentMouse] = useState(new Vector2());
  const [targetMouse, setTargetMouse] = useState(new Vector2());

  const shaderMaterial = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          u_time: { value: 0 },
          u_mouse: { value: new Vector2() },
          u_mouse_velocity: { value: new Vector2() },
          u_resolution: {
            value: new Vector2(
              size.width * viewport.dpr,
              size.height * viewport.dpr
            ),
          },
          u_orb_size: { value: orb_size },
          u_contrast: { value: contrast },
          u_columns: { value: columns },
          u_glow: { value: glow },
          u_grid_toggle: { value: grid },
        },
        vertexShader: VRTX_SHADER,
        fragmentShader: FRAG_SHADER,
      }),
    [viewport, size, columns, glow, orb_size, contrast, grid]
  );

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
    // Smoothly update the current mouse position
    setCurrentMouse(
      new Vector2(
        currentMouse.x + (targetMouse.x - currentMouse.x) * easing_factor,
        currentMouse.y + (targetMouse.y - currentMouse.y) * easing_factor
      )
    );

    shaderMaterial.uniforms.u_mouse.value.set(currentMouse.x, currentMouse.y);
    shaderMaterial.uniforms.u_time.value = state.clock.getElapsedTime();
  });

  return (
    <mesh
      scale={[viewport.width, viewport.height, 1]}
      onPointerMove={handlePointerMove}
    >
      <planeGeometry args={[1, 1, 1, 1]} />
      <primitive object={shaderMaterial} />
    </mesh>
  );
};
