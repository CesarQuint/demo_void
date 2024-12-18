import { ThreeEvent, useThree } from '@react-three/fiber';
import { useCallback, useRef } from 'react';
import { Vector2 } from 'three';

type SplatStack = {
    mouseX?: number;
    mouseY?: number;
    velocityX?: number;
    velocityY?: number;
};

export const usePointer = ({ force }: { force: number }) => {
    const { size, gl } = useThree((three) => ({
        size: three.size,
        gl: three.gl.domElement,
    }));

    const splatStack: SplatStack[] = useRef([]).current;

    const lastMouse = useRef<Vector2>(new Vector2());
    const hasMoved = useRef<boolean>(false);

    const onPointerMove = useCallback(
        (event: ThreeEvent<PointerEvent>) => {
            // Get the bounding rectangle of the canvas
            const rect = gl.getBoundingClientRect();

            // Calculate mouse position relative to the canvas
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            // Normalize coordinates
            const normalizedX = mouseX / rect.width;
            const normalizedY = 1.0 - mouseY / rect.height;

            // Calculate delta
            const deltaX = mouseX - lastMouse.current.x;
            const deltaY = mouseY - lastMouse.current.y;

            if (!hasMoved.current) {
                hasMoved.current = true;
                lastMouse.current.set(mouseX, mouseY);
            }

            lastMouse.current.set(mouseX, mouseY);

            if (!hasMoved.current) return;

            splatStack.push({
                mouseX: normalizedX,
                mouseY: normalizedY,
                velocityX: deltaX * force,
                velocityY: -deltaY * force,
            });
        },
        [force, gl],
    );

    return { onPointerMove, splatStack };
};
