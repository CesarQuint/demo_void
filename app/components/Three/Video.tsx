//!!

// "use client";
// import React, { useRef, useState } from "react";
// import {
//   Canvas,
//   extend,
//   useFrame,
//   useThree,
//   ThreeEvent,
//   useLoader,
// } from "@react-three/fiber";
// import { shaderMaterial } from "@react-three/drei";
// import * as THREE from "three";
// import { TextureLoader } from "three";
// import css from "../../css/home.module.css";

// // Vertex Shader
// const vertexShader = `
//   varying vec2 vUv;

//   void main() {
//     vUv = uv;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//   }
// `;

// // Fragment Shader
// const fragmentShader = `
//   uniform float time;
//   uniform vec2 mousePositions[10]; // Array to hold multiple mouse positions
//   uniform float mouseTimes[10];    // Array to hold the times when the mouse positions were updated
//   uniform sampler2D tMap;
//   uniform float rippleStrength;
//   varying vec2 vUv;

//   void main() {
//     vec2 uv = vUv;
//     vec3 color = texture2D(tMap, uv).rgb;

//     for (int i = 0; i < 10; i++) {
//       float age = time - mouseTimes[i];
//       if (age < 1.0) {
//         float dist = distance(uv, mousePositions[i]);
//         float ripple = sin(dist * 40.0 - time * 10.0) * 0.05 / dist;
//         ripple *= exp(-dist * 30.0) * rippleStrength * (1.0 - age); // Ripple fades out over time
//         uv.y += ripple;

//         // Chromatic Aberration offsets based on ripple strength
//         float aberrationStrength = clamp(ripple * 0.5, 0.0, 0.02); // Adjust the factor for strength
//         vec3 offset = vec3(aberrationStrength, -aberrationStrength, aberrationStrength * 2.0); // Adjust these values for the desired effect

//         color.r = texture2D(tMap, uv + offset.r).r;
//         color.g = texture2D(tMap, uv + offset.g).g;
//         color.b = texture2D(tMap, uv + offset.b).b;
//       }
//     }

//     gl_FragColor = vec4(color, 1.0);
//   }
// `;

// // Define the shader material with chromatic aberration
// const RippleShaderMaterial = shaderMaterial(
//   {
//     time: 1,
//     mousePositions: Array(10).fill(new THREE.Vector2(0.5, 0.5)),
//     mouseTimes: Array(10).fill(5),
//     resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
//     tMap: null,
//     rippleStrength: 0,
//   },
//   vertexShader,
//   fragmentShader
// );

// // Extend the shader material
// extend({ RippleShaderMaterial });

// // Declare JSX intrinsic elements
// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       rippleShaderMaterial: {
//         time: number;
//         mousePositions: THREE.Vector2[];
//         mouseTimes: number[];
//         resolution: THREE.Vector2;
//         tMap: THREE.Texture | null;
//         rippleStrength: number;
//         ref: React.RefObject<THREE.ShaderMaterial>;
//       };
//     }
//   }
// }

// // Ripple component
// const Ripple: React.FC = () => {
//   const materialRef = useRef<THREE.ShaderMaterial>(null);
//   const { clock, size } = useThree();
//   const [mousePositions, setMousePositions] = useState<Array<THREE.Vector2>>(
//     Array(10).fill(new THREE.Vector2(0.5, 0.5))
//   );
//   const [mouseTimes, setMouseTimes] = useState<Array<number>>(
//     Array(10).fill(0)
//   );
//   const [hover, setHover] = useState(false);
//   const [rippleStrength, setRippleStrength] = useState(0);
//   const texture = useLoader(
//     TextureLoader,
//     "https://imgs.search.brave.com/WXkybweeXYP4Nu43tKQWANiwllLt1uGdS1sr-DCYoHU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTA3/MTIwNDEzNi9waG90/by9jdXRlLWJlbmdh/bC1mdW5ueS1jYXQt/cGxheWluZy5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9NGVK/Zks1UXAwYzM2b3Y2/LUNxSzhDZzZFcUxt/YXZySldQZ1RrY3NK/LVd3ST0" // Replace with your image URL
//   );

//   // Handle pointer move event
//   const onPointerMove = (event: ThreeEvent<PointerEvent>) => {
//     if (event.intersections.length > 0) {
//       const uv = event.intersections[0].uv;
//       if (uv) {
//         const elapsedTime = clock.getElapsedTime();
//         const lastMouseTime = mouseTimes[mouseTimes.length - 1];

//         // Only update if the elapsed time since the last update is greater than a threshold (e.g., 0.5 seconds)

//         const getRandomArbitrary = (min: number, max: number) => {
//           return Math.random() * (max - min) + min;
//         };

//         const randomize = getRandomArbitrary(0.02, 0.1);

//         console.log(randomize);

//         if (elapsedTime - lastMouseTime > randomize) {
//           const newMousePositions = mousePositions
//             .slice(1)
//             .concat([new THREE.Vector2(uv.x, uv.y)]);
//           const newMouseTimes = mouseTimes.slice(1).concat([elapsedTime]);
//           setMousePositions(newMousePositions);
//           setMouseTimes(newMouseTimes);
//         }
//       }
//     }
//   };

//   // Handle pointer over event
//   const onPointerOver = () => setHover(true);

//   // Handle pointer out event
//   const onPointerOut = () => setHover(false);

//   // Update shader uniforms every frame
//   useFrame(() => {
//     if (materialRef.current) {
//       materialRef.current.uniforms.time.value = clock.getElapsedTime();
//       materialRef.current.uniforms.mousePositions.value = mousePositions;
//       materialRef.current.uniforms.mouseTimes.value = mouseTimes;
//       materialRef.current.uniforms.resolution.value.set(
//         size.width,
//         size.height
//       );
//       materialRef.current.uniforms.tMap.value = texture;
//       materialRef.current.uniforms.rippleStrength.value = rippleStrength;
//     }

//     // Gradually increase or decrease rippleStrength
//     if (hover && rippleStrength < 1) {
//       setRippleStrength((prev) => Math.min(prev + 0.009, 1));
//     } else if (!hover && rippleStrength > 0) {
//       setRippleStrength((prev) => Math.max(prev - 0.009, 0));
//     }
//   });

//   return (
//     <mesh
//       onPointerMove={onPointerMove}
//       onPointerOver={onPointerOver}
//       onPointerOut={onPointerOut}>
//       <planeGeometry args={[11, 6]} />
//       <rippleShaderMaterial
//         ref={materialRef}
//         time={0}
//         mousePositions={mousePositions}
//         mouseTimes={mouseTimes}
//         resolution={new THREE.Vector2(window.innerWidth, window.innerHeight)}
//         tMap={texture}
//         rippleStrength={rippleStrength}
//       />
//     </mesh>
//   );
// };

// // Video component
// const Video: React.FC = () => {
//   return (
//     <div className={css.scene}>
//       <Canvas className={css.canvas}>
//         <Ripple />
//       </Canvas>
//     </div>
//   );
// };

// export default Video;

//! "use client";
// import React, { useRef, useState } from "react";
// import {
//   Canvas,
//   extend,
//   useFrame,
//   useThree,
//   ThreeEvent,
//   useLoader,
// } from "@react-three/fiber";
// import { shaderMaterial } from "@react-three/drei";
// import * as THREE from "three";
// import { TextureLoader } from "three";
// import css from "../../css/home.module.css";

// // Vertex Shader
// const vertexShader = `
//   varying vec2 vUv;

//   void main() {
//     vUv = uv;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//   }
// `;

// // Fragment Shader
// const fragmentShader = `
//   uniform float time;
//   uniform vec2 mousePositions[10];
//   uniform float mouseTimes[10];
//   uniform sampler2D tMap;
//   uniform float rippleStrength;
//   varying vec2 vUv;

//   float rand(vec2 co){
//       return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
//   }

//   void main() {
//     vec2 uv = vUv;
//     vec3 color = texture2D(tMap, uv).rgb;

//     for (int i = 0; i < 10; i++) {
//       float age = time - mouseTimes[i];
//       if (age < 1.0) {
//         float dist = distance(uv, mousePositions[i]);
//         float ripple = sin(dist * 40.0 - time * 10.0) * 0.05 / dist;
//         ripple *= exp(-dist * 30.0) * rippleStrength * (1.0 - age);
//         ripple *= rand(vec2(dist, age)); // Random factor

//         uv.y += ripple;

//         // Chromatic Aberration offsets based on ripple strength
//         float aberrationStrength = clamp(ripple * 0.8, 0.0, 0.05); // Adjusted the factor for stronger effect
//         vec3 offset = vec3(aberrationStrength, -aberrationStrength, aberrationStrength * 2.0);

//         color.r = texture2D(tMap, uv + offset.r).r;
//         color.g = texture2D(tMap, uv + offset.g).g;
//         color.b = texture2D(tMap, uv + offset.b).b;
//       }
//     }

//     gl_FragColor = vec4(color, 1.0);
//   }
// `;

// // Define the shader material with chromatic aberration
// const RippleShaderMaterial = shaderMaterial(
//   {
//     time: 1,
//     mousePositions: Array(10).fill(new THREE.Vector2(0.5, 0.5)),
//     mouseTimes: Array(10).fill(5),
//     resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
//     tMap: null,
//     rippleStrength: 0,
//   },
//   vertexShader,
//   fragmentShader
// );

// // Extend the shader material
// extend({ RippleShaderMaterial });

// // Declare JSX intrinsic elements
// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       rippleShaderMaterial: {
//         time: number;
//         mousePositions: THREE.Vector2[];
//         mouseTimes: number[];
//         resolution: THREE.Vector2;
//         tMap: THREE.Texture | null;
//         rippleStrength: number;
//         ref: React.RefObject<THREE.ShaderMaterial>;
//       };
//     }
//   }
// }

// // Ripple component
// const Ripple: React.FC = () => {
//   const materialRef = useRef<THREE.ShaderMaterial>(null);
//   const { clock, size } = useThree();
//   const [mousePositions, setMousePositions] = useState<Array<THREE.Vector2>>(
//     Array(10).fill(new THREE.Vector2(0.5, 0.5))
//   );
//   const [mouseTimes, setMouseTimes] = useState<Array<number>>(
//     Array(10).fill(0)
//   );
//   const [hover, setHover] = useState(false);
//   const [rippleStrength, setRippleStrength] = useState(0);
//   const texture = useLoader(
//     TextureLoader,
//     "https://imgs.search.brave.com/WXkybweeXYP4Nu43tKQWANiwllLt1uGdS1sr-DCYoHU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTA3/MTIwNDEzNi9waG90/by9jdXRlLWJlbmdh/bC1mdW5ueS1jYXQt/cGxheWluZy5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9NGVK/Zks1UXAwYzM2b3Y2/LUNxSzhDZzZFcUxt/YXZySldQZ1RrY3NK/LVd3ST0"
//   );

//   // Handle pointer move event
//   const onPointerMove = (event: ThreeEvent<PointerEvent>) => {
//     if (event.intersections.length > 0) {
//       const uv = event.intersections[0].uv;
//       if (uv) {
//         const elapsedTime = clock.getElapsedTime();
//         const lastMouseTime = mouseTimes[mouseTimes.length - 1];

//         // Only update if the elapsed time since the last update is greater than a threshold (e.g., 0.5 seconds)
//         const getRandomArbitrary = (min: number, max: number) => {
//           return Math.random() * (max - min) + min;
//         };

//         const randomize = getRandomArbitrary(0.02, 0.1);

//         if (elapsedTime - lastMouseTime > randomize) {
//           const newMousePositions = mousePositions
//             .slice(1)
//             .concat([new THREE.Vector2(uv.x, uv.y)]);
//           const newMouseTimes = mouseTimes.slice(1).concat([elapsedTime]);
//           setMousePositions(newMousePositions);
//           setMouseTimes(newMouseTimes);
//         }
//       }
//     }
//   };

//   // Handle pointer over event
//   const onPointerOver = () => setHover(true);

//   // Handle pointer out event
//   const onPointerOut = () => setHover(false);

//   // Update shader uniforms every frame
//   useFrame(() => {
//     if (materialRef.current) {
//       materialRef.current.uniforms.time.value = clock.getElapsedTime();
//       materialRef.current.uniforms.mousePositions.value = mousePositions;
//       materialRef.current.uniforms.mouseTimes.value = mouseTimes;
//       materialRef.current.uniforms.resolution.value.set(
//         size.width,
//         size.height
//       );
//       materialRef.current.uniforms.tMap.value = texture;
//       materialRef.current.uniforms.rippleStrength.value = rippleStrength;
//     }

//     // Gradually increase or decrease rippleStrength
//     if (hover && rippleStrength < 1) {
//       setRippleStrength((prev) => Math.min(prev + 0.009, 1));
//     } else if (!hover && rippleStrength > 0) {
//       setRippleStrength((prev) => Math.max(prev - 0.009, 0));
//     }
//   });

//   return (
//     <mesh
//       onPointerMove={onPointerMove}
//       onPointerOver={onPointerOver}
//       onPointerOut={onPointerOut}>
//       <planeGeometry args={[11, 6]} />
//       <rippleShaderMaterial
//         ref={materialRef}
//         time={0}
//         mousePositions={mousePositions}
//         mouseTimes={mouseTimes}
//         resolution={new THREE.Vector2(window.innerWidth, window.innerHeight)}
//         tMap={texture}
//         rippleStrength={rippleStrength}
//       />
//     </mesh>
//   );
// };

// // Video component
// const Video: React.FC = () => {
//   return (
//     <div className={css.scene}>
//       <Canvas className={css.canvas}>
//         <Ripple />
//       </Canvas>
//     </div>
//   );
// };

// export default Video;

// "use client";
import React, { useRef, useState } from "react";
import {
    Canvas,
    extend,
    useFrame,
    useThree,
    ThreeEvent,
    useLoader,
} from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";
import css from "../../css/home.module.css";

// Vertex Shader
const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader
const fragmentShader = `
  uniform float time;
  uniform vec2 mousePositions[10]; // Array to hold multiple mouse positions
  uniform float mouseTimes[10];    // Array to hold the times when the mouse positions were updated
  uniform sampler2D tMap;
  uniform float rippleStrength;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec3 color = texture2D(tMap, uv).rgb;

    for (int i = 0; i < 10; i++) {
      float age = time - mouseTimes[i];
      if (age < 1.0) {
        float dist = distance(uv, mousePositions[i]);
        
        // Randomize oscillation speed
        float oscillationSpeed = 20.0 + mod(float(i) * 10.0, 40.0); // Adjust the modulation factor for speed
        
        // Randomize ripple size
        float rippleSize = 0.2 + fract(float(i) * 0.1) * 0.1; // Adjust the factor for size variation
        
        // Calculate ripple effect
        float ripple = sin(dist * oscillationSpeed - time * 10.0) * rippleSize / dist;
        ripple *= exp(-dist * 30.0) * rippleStrength * (1.0 - age); // Ripple fades out over time
        uv.y += ripple;

        // Chromatic Aberration offsets based on ripple strength
        float aberrationStrength = clamp(ripple * 0.5, 0.0, 0.2); // Adjust the factor for strength
        vec3 offset = vec3(aberrationStrength, -aberrationStrength, aberrationStrength * 22.0); // Adjust these values for the desired effect

        // Apply texture color with fading effect
        color.r = mix(texture2D(tMap, uv + offset.r).r, color.r, rippleSize);
        color.g = mix(texture2D(tMap, uv + offset.g).g, color.g, rippleSize);
        color.b = mix(texture2D(tMap, uv + offset.b).b, color.b, rippleSize);
      }
    }

    // Apply texture color
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Define the shader material with chromatic aberration
const RippleShaderMaterial = shaderMaterial(
    {
        time: 1,
        mousePositions: Array(10).fill(new THREE.Vector2(0.5, 0.5)),
        mouseTimes: Array(10).fill(5),
        resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
        tMap: null,
        rippleStrength: 10,
    },
    vertexShader,
    fragmentShader,
);

// Extend the shader material
extend({ RippleShaderMaterial });

// Declare JSX intrinsic elements
declare global {
    namespace JSX {
        interface IntrinsicElements {
            rippleShaderMaterial: {
                time: number;
                mousePositions: THREE.Vector2[];
                mouseTimes: number[];
                resolution: THREE.Vector2;
                tMap: THREE.Texture | null;
                rippleStrength: number;
                ref: React.RefObject<THREE.ShaderMaterial>;
            };
        }
    }
}

// Ripple component
const Ripple: React.FC = () => {
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { clock, size } = useThree();
    const [mousePositions, setMousePositions] = useState<Array<THREE.Vector2>>(
        Array(10).fill(new THREE.Vector2(0.5, 0.5)),
    );
    const [mouseTimes, setMouseTimes] = useState<Array<number>>(
        Array(10).fill(0),
    );
    const [hover, setHover] = useState(false);
    const [rippleStrength, setRippleStrength] = useState(0);
    const texture = useLoader(
        TextureLoader,
        "https://imgs.search.brave.com/WXkybweeXYP4Nu43tKQWANiwllLt1uGdS1sr-DCYoHU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTA3/MTIwNDEzNi9waG90/by9jdXRlLWJlbmdh/bC1mdW5ueS1jYXQt/cGxheWluZy5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9NGVK/Zks1UXAwYzM2b3Y2/LUNxSzhDZzZFcUxt/YXZySldQZ1RrY3NK/LVd3ST0", // Replace with your image URL
    );

    // Handle pointer move event
    const onPointerMove = (event: ThreeEvent<PointerEvent>) => {
        if (event.intersections.length > 0) {
            const uv = event.intersections[0].uv;
            if (uv) {
                const elapsedTime = clock.getElapsedTime();
                const lastMouseTime = mouseTimes[mouseTimes.length - 1];

                // Only update if the elapsed time since the last update is greater than a threshold (e.g., 0.1 seconds)
                if (elapsedTime - lastMouseTime > 0.01) {
                    const newMousePositions = mousePositions
                        .slice(1)
                        .concat([new THREE.Vector2(uv.x, uv.y)]);
                    const newMouseTimes = mouseTimes
                        .slice(1)
                        .concat([elapsedTime]);
                    setMousePositions(newMousePositions);
                    setMouseTimes(newMouseTimes);
                }
            }
        }
    };

    // Handle pointer over event
    const onPointerOver = () => setHover(true);

    // Handle pointer out event
    const onPointerOut = () => setHover(false);

    // Update shader uniforms every frame
    useFrame(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.time.value = clock.getElapsedTime();
            materialRef.current.uniforms.mousePositions.value = mousePositions;
            materialRef.current.uniforms.mouseTimes.value = mouseTimes;
            materialRef.current.uniforms.resolution.value.set(
                size.width,
                size.height,
            );
            materialRef.current.uniforms.tMap.value = texture;
            materialRef.current.uniforms.rippleStrength.value = rippleStrength;
        }

        // Gradually increase or decrease rippleStrength
        if (hover && rippleStrength < 1) {
            setRippleStrength((prev) => Math.min(prev + 0.009, 1));
        } else if (!hover && rippleStrength > 0) {
            setRippleStrength((prev) => Math.max(prev - 0.009, 0));
        }
    });

    return (
        <mesh
            onPointerMove={onPointerMove}
            onPointerOver={onPointerOver}
            onPointerOut={onPointerOut}
        >
            <planeGeometry args={[11, 6]} />
            <rippleShaderMaterial
                ref={materialRef}
                time={0}
                mousePositions={mousePositions}
                mouseTimes={mouseTimes}
                resolution={
                    new THREE.Vector2(window.innerWidth, window.innerHeight)
                }
                tMap={texture}
                rippleStrength={rippleStrength}
            />
        </mesh>
    );
};

// Video component
const Video: React.FC = () => {
    return (
        <div className={css.scene}>
            <Canvas className={css.canvas}>
                <Ripple />
            </Canvas>
        </div>
    );
};

export default Video;
