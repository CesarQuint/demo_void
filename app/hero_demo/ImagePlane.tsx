import { TextureLoader } from "three";
import { useLoader, useThree } from "@react-three/fiber";

export const ImagePlane = ({ imageUrl }: { imageUrl: string }) => {
    const texture = useLoader(TextureLoader, imageUrl);
    const { viewport } = useThree();

    return (
        <mesh scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1, 1, 1]} />
            <meshBasicMaterial map={texture} />
        </mesh>
    );
};
