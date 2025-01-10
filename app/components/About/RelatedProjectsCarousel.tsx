import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Transition, motion, useMotionValue } from "framer-motion";
import styles from "../../css/About/relatedProyectsCarousel.module.css";
import { Project } from "../../Strapi/interfaces/Entities/Project";
import { useNavigation } from "../../utils/navigationContext";

const TRANSITION_CONFIG: Transition = {
    type: "tween",
    duration: 0.4,
    ease: "easeInOut",
};

type RelatedProjectsCarouselProps = {
    data: Project[];
    className?: string;
    titleClassName?: string;
};

const RelatedProjectsCarousel = (props: RelatedProjectsCarouselProps) => {
    const [selectedStep, setSelectedStep] = useState(0);
    const dragX = useMotionValue(0);
    const { setNavigationEvent } = useNavigation();

    const DRAG_BUFFER = 20;

    const onDragEnd = () => {
        const x = dragX.get();
        if (x <= -DRAG_BUFFER && selectedStep < props.data.length - 1) {
            setSelectedStep((pv) => pv + 1);
        } else if (x >= DRAG_BUFFER && selectedStep > 0) {
            setSelectedStep((pv) => pv - 1);
        }
    };

    useEffect(() => {
        setSelectedStep(0);
    }, [props.data]);

    return (
        !!props.data.length && (
            <section className={props.className ?? styles.main}>
                <h2 className={props.titleClassName ?? styles.heading}>
                    Proyectos Relacionados
                </h2>
                <div className={styles.section}>
                    <div className={styles.container}>
                        <motion.div
                            drag="x"
                            dragConstraints={{
                                left: 0,
                                right: 0,
                            }}
                            style={{
                                x: dragX,
                            }}
                            animate={{
                                translateX: `-${selectedStep * 100}%`,
                            }}
                            transition={TRANSITION_CONFIG}
                            onDragEnd={onDragEnd}
                            className={styles.carousel}
                        >
                            <ProjectThumbnails
                                projects={props.data}
                                activeIndex={selectedStep}
                                setActiveIndex={setSelectedStep}
                                setNavigationEvent={(href: string) =>
                                    setNavigationEvent({ state: true, href })
                                }
                            />
                        </motion.div>
                    </div>
                </div>

                <StepButtons
                    index={selectedStep}
                    length={props.data.length}
                    setIndex={setSelectedStep}
                />
            </section>
        )
    );
};

const ProjectThumbnails: React.FC<{
    projects: Project[];
    activeIndex: number;
    setActiveIndex: Dispatch<SetStateAction<number>>;
    setNavigationEvent: (href: string) => void;
}> = ({ projects, activeIndex, setActiveIndex, setNavigationEvent }) => (
    <>
        {projects.map((project, idx) => (
            <motion.div
                key={idx}
                animate={{
                    scale: activeIndex === idx ? 0.95 : 0.85,
                }}
                transition={TRANSITION_CONFIG}
                className={styles.cover}
                onClick={() => setActiveIndex(idx)}
                style={{
                    backgroundImage:
                        `url(${process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL}` +
                        `${project.attributes.Cover.data.attributes.url})`,
                }}
            >
                <div
                    className={styles.contents}
                    onClick={() =>
                        setNavigationEvent(
                            "/projects/" + project.attributes.slug,
                        )
                    }
                >
                    <p>{project.attributes.EventDate}</p>
                    <h3
                        style={{
                            fontFamily: "graphie",
                            fontSize: "2rem",
                            fontWeight: "100",
                        }}
                    >
                        {project.attributes.Title}
                    </h3>
                    <p style={{ textTransform: "uppercase", lineHeight: 1.2 }}>
                        {project.attributes.Subtitle}
                    </p>
                </div>
            </motion.div>
        ))}
    </>
);

const StepButtons: React.FC<{
    index: number;
    length: number;
    setIndex: Dispatch<SetStateAction<number>>;
}> = ({ index, length, setIndex }) => (
    <div className={styles.steps}>
        {Array(length)
            .fill(null)
            .map((_, idx) => (
                <span
                    key={idx}
                    onClick={() => setIndex(idx)}
                    className={
                        styles.step +
                        " " +
                        (index === idx ? styles.activeStep : "")
                    }
                />
            ))}
    </div>
);

export default RelatedProjectsCarousel;
