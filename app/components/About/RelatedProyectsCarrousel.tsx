import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Transition, motion, useMotionValue } from "framer-motion";
import styles from "../../css/About/relatedProyectsCarousel.module.css";
import { Project } from "../../Strapi/interfaces/Entities/Project";
import { useNavigation } from "../../utils/navigationContext";

const TRANSITION_CONFIG: Transition = {
    type: "spring",
    bounce: 0.2,
};

type Props = { data: Project[] };

const RelatedProyectsCarrousel = (props: Props) => {
    const [selectedStep, setSelectedStep] = useState(0);
    const dragX = useMotionValue(0);
    const { setNavigationEvent } = useNavigation();


    const DRAG_BUFFER = 50;

    const onDragEnd = () => {
        const x = dragX.get();
        if (x <= -DRAG_BUFFER && selectedStep < props.data.length - 1) {
            setSelectedStep((pv) => pv + 1);
        } else if (x >= DRAG_BUFFER && selectedStep > 0) {
            setSelectedStep((pv) => pv - 1);
        }
    };

    return (!!props.data.length &&
        <section>
            <h2 className={styles.heading}>
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
                            x: dragX
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
                            setNavigationEvent={(href: string) => setNavigationEvent({ state: true, href })}
                        />
                    </motion.div>

                    <StepButtons
                        index={selectedStep}
                        length={props.data.length}
                        setIndex={setSelectedStep}
                    />
                </div>
            </div>
        </section>
    );
};

const ProjectThumbnails: React.FC<{
    projects: Project[];
    activeIndex: number;
    setActiveIndex: Dispatch<SetStateAction<number>>;
    setNavigationEvent: (href: string) => void;
}> = ({
    projects,
    activeIndex,
    setActiveIndex,
    setNavigationEvent,
}) => (<>
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
                    `url(${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}` +
                    `${project.attributes.Cover.data.attributes.url})`,
            }}
        >
            <div
                className={styles.contents}
                onClick={() => setNavigationEvent('/projects/' + project.attributes.slug)}
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
                <p style={{ textTransform: "uppercase" }}>{project.attributes.Subtitle}</p>
            </div>
        </motion.div>
    ))}
</>);

const StepButtons: React.FC<{
    index: number;
    length: number;
    setIndex: Dispatch<SetStateAction<number>>;
}> = ({
    index,
    length,
    setIndex,
}) => (
        <div className={styles.steps}>
            {Array(length)
                .fill(null)
                .map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setIndex(idx)}
                        className={styles.step + ' ' + (index === idx ? styles.activeStep : '')}
                    />
                ))
            }
        </div>
    );

export default RelatedProyectsCarrousel;
