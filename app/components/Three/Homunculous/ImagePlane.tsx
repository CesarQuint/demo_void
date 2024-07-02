import * as THREE from "three";
import { useTexture, Plane } from "@react-three/drei";
//! Image loader area
export const ImagePlane: React.FC = () => {
  const textures = useTexture([
    "https://imgs.search.brave.com/WXkybweeXYP4Nu43tKQWANiwllLt1uGdS1sr-DCYoHU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTA3/MTIwNDEzNi9waG90/by9jdXRlLWJlbmdh/bC1mdW5ueS1jYXQt/cGxheWluZy5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9NGVK/Zks1UXAwYzM2b3Y2/LUNxSzhDZzZFcUxt/YXZySldQZ1RrY3NK/LVd3ST0",
    "https://imgs.search.brave.com/WXkybweeXYP4Nu43tKQWANiwllLt1uGdS1sr-DCYoHU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTA3/MTIwNDEzNi9waG90/by9jdXRlLWJlbmdh/bC1mdW5ueS1jYXQt/cGxheWluZy5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9NGVK/Zks1UXAwYzM2b3Y2/LUNxSzhDZzZFcUxt/YXZySldQZ1RrY3NK/LVd3ST0",
    "https://imgs.search.brave.com/WXkybweeXYP4Nu43tKQWANiwllLt1uGdS1sr-DCYoHU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTA3/MTIwNDEzNi9waG90/by9jdXRlLWJlbmdh/bC1mdW5ueS1jYXQt/cGxheWluZy5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9NGVK/Zks1UXAwYzM2b3Y2/LUNxSzhDZzZFcUxt/YXZySldQZ1RrY3NK/LVd3ST0",
  ]);

  const material = (texture: THREE.Texture) =>
    new THREE.ShaderMaterial({
      uniforms: {
        u_texture: { value: texture },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

  // --------------------------------------------------------
  const vertexShader = `
      varying vec2 v_uv;
  
      void main() {
        v_uv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
      `;

  const fragmentShader = `
      uniform sampler2D u_texture;
      varying vec2 v_uv;
  
      void main() {
        vec4 color = texture2D(u_texture, v_uv);
        gl_FragColor = color;
      }
      `;

  return (
    <>
      {textures.map((texture, i) => (
        <Plane
          key={i}
          args={[1, 1 * (315 / 600)]}
          material={material(texture)}
          scale={0.98}
          position={[i - 1, 0, 0]}
        />
      ))}
    </>
  );
};
