import React, { useState, useEffect, useRef } from 'react';
import css from '../css/cursor.module.css';

export const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const cursorRingRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);

    const onMouseMove = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, []);

    useEffect(() => {
        if (cursorRingRef.current && cursorDotRef.current) {
            cursorRingRef.current.style.left = `${position.x}px`;
            cursorRingRef.current.style.top = `${position.y}px`;
            cursorDotRef.current.style.left = `${position.x}px`;
            cursorDotRef.current.style.top = `${position.y}px`;
        }
    }, [position]);

    return (
        <>
            <div
                ref={cursorRingRef}
                className={css.cursor_ring}
            ></div>
            <div
                ref={cursorDotRef}
                className={css.cursor_dot}
            ></div>
        </>
    );
};
