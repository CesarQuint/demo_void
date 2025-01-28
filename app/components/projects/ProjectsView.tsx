"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    motion,
    usePresence,
    useAnimate,
    animate as animation,
    AnimationSequence,
    Spring,
} from "framer-motion";
import dynamic from "next/dynamic";

import styles from "../../css/Projects/main.module.css";
import { usePathname } from "next/navigation";
import { useNavigation } from "../../utils/navigationContext";

import { Category } from "../../Strapi/interfaces/Entities/Category";

const ProjectsSectionView = dynamic(() => import("./ProjectsSectionView"), {
    ssr: false,
});
const PreFooterLink = dynamic(() => import("../PreFooterLink"), { ssr: false });
const Footer = dynamic(() => import("../footer"), { ssr: false });

const transitionSpringPhysics: Spring = {
    type: "spring",
    mass: 0.5,
    stiffness: 20,
    damping: 2,
};

export function ProjectsView(props: { data: { categories: Category[] } }) {
    const [isPresent, safeToRemove] = usePresence();
    const [scope2] = useAnimate();
    const [scope3] = useAnimate();
    const pathname = usePathname();
    const { navigationEvent } = useNavigation();
    const router = useRouter();
    const [state, setState] = useState<boolean>(false);

    useEffect(() => {
        const sequence: AnimationSequence = [
            [
                scope2.current,
                { height: "0%", top: "50%", backgroundColor: "black" },
                { duration: 0.4 },
            ],
            [
                scope3.current,
                { height: "0%", bottom: "50%", backgroundColor: "black" },
                { at: "<", duration: 0.4 },
            ],
        ];

        animation(sequence);
        return () => {
            if (!isPresent) {
                safeToRemove();
            }
        };
    }, []);

    useEffect(() => {
        if (navigationEvent.href !== pathname) {
            const sequence: AnimationSequence = [
                [
                    scope2.current,
                    { height: "51%", top: "0", backgroundColor: "black" },
                    { duration: 0.4 },
                ],
                [
                    scope3.current,
                    { height: "51%", bottom: "0", backgroundColor: "black" },
                    { at: "<", duration: 0.4 },
                ],
            ];

            animation(sequence).then(() => {
                router.push(navigationEvent.href);
            });
        }
    }, [navigationEvent, pathname]);

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            className={`${styles.main}`}
        >
            <motion.div
                ref={scope2}
                style={{
                    width: "100%",
                    height: "52%",
                    position: "fixed",
                    zIndex: 50,
                    left: 0,
                    top: 0,
                }}
                transition={transitionSpringPhysics}
                className="courtain"
            />
            <motion.div
                ref={scope3}
                style={{
                    width: "100%",
                    height: "52%",
                    zIndex: 50,
                    position: "fixed",
                    left: 0,
                    bottom: 0,
                }}
                transition={transitionSpringPhysics}
                className="courtain"
            />
            <ProjectsSectionView
                data={props.data}
                loadState={() => setState(!state)}
            />
            <PreFooterLink href="/about" text="CONOCENOS" />
            {state && <Footer />}
        </motion.div>
    );
}
