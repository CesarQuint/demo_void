"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import s from "./ProjectCaseStudy.module.css";
import { ScrollTrigger, Draggable } from "gsap/all";
import RelatedProjectsCarousel from "../../components/About/RelatedProjectsCarousel";
import GalleryCarousel from "../../components/case-study/section-components/Gallery";
import {
    ContentSectionName,
    Project,
} from "../../Strapi/interfaces/Entities/Project";
import CaseStudyWrapper from "../../components/Horizontal/CaseStudyWrapper";
import Cover from "../../components/case-study/section-components/Cover";
import ContentSections, {
    ContentSectionsProps,
} from "../../components/case-study/section-components/ContentSections";
import ContentMenu, {
    sectionHasContent,
} from "../../components/case-study/section-components/ContentMenu";
import Introduction from "../../components/case-study/section-components/Introduction";
import CaseStudyVideo from "../../components/case-study/section-components/IntroductoryVideo";
import useWindow from "@/app/utils/hooks/useWindow";
import { useLenis } from "@studio-freight/react-lenis";
import {
    mapAttributesToContentImages,
    mapProjectDataToMenuItems,
} from "../case-study/section-components/utils/imageStatus";

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable);

export default function ProjectCaseStudy(props: {
    data: { project: Project; related: Project[] };
}) {
    const [isMobile, setIsMobile] = useState(false);
    const container = useRef<HTMLElement>(null);
    const scrollContainer = useRef<HTMLDivElement>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);
    const windowStatus = useWindow();
    const [panels, setPanels] = useState<HTMLElement[]>([]);
    const [scrollableFromDoc, setScrollableFromDoc] = useState<number>(0);
    const [clientVisibleHeight, setClientVisibleHeight] = useState<number>(0);
    const lenis = useLenis();
    const [currIndx, setCurrIndx] = useState<number>(0);
    const [isScrolling, setIsScrolling] = useState<boolean>(false);
    const [functionalScrolling, setFunctionalScrolling] =
        useState<boolean>(false);

    const project = props.data.project;
    const imagesContent = mapAttributesToContentImages(project.attributes);
    const tagsMobile = mapProjectDataToMenuItems(project).map(
        (pro) => pro.title
    );

    const PROJECT_CONTENTS: ContentSectionsProps["data"] = [
        {
            name: ContentSectionName.CONCEPTUALIZATION,
            data: project.attributes[ContentSectionName.CONCEPTUALIZATION],
        },
        {
            name: ContentSectionName.DEVELOPMENT,
            data: project.attributes[ContentSectionName.DEVELOPMENT],
        },
        {
            name: ContentSectionName.PRODUCTION,
            data: project.attributes[ContentSectionName.PRODUCTION],
        },
    ].filter((section) => sectionHasContent(project)(section.name));

    // Populate panels after the DOM is rendered
    useEffect(() => {
        const panelElements = gsap.utils.toArray(
            `.${s.panel}`
        ) as HTMLElement[];
        setPanels(panelElements);
    }, []);

    useEffect(() => {
        if (
            windowStatus.innerWidth >= 1024 &&
            lenis &&
            panels.length > 0 &&
            scrollableFromDoc !== 0 &&
            clientVisibleHeight !== 0
        ) {
            const availableScroll =
                (scrollableFromDoc - clientVisibleHeight) / (panels.length - 1);

            const handleScroll = (e: any) => {
                if (functionalScrolling) return;

                if (isScrolling) return;

                const scrollPosition = window.scrollY;
                const maxScroll = scrollableFromDoc - clientVisibleHeight;

                // Prevent scroll handling when at the extremes
                if (scrollPosition <= 0 || scrollPosition >= maxScroll) return;

                const nextIndx =
                    e.direction === 1
                        ? Math.min(currIndx + 1, panels.length - 1)
                        : Math.max(currIndx - 1, 0);

                if (nextIndx !== currIndx) {
                    let scrollPx = availableScroll * nextIndx;

                    if (nextIndx == panels.length - 1) {
                        scrollPx = scrollPx - 1;
                    }

                    setIsScrolling(true);
                    lenis.stop();
                    lenis.scrollTo(scrollPx, {
                        force: true,
                        lock: true,
                        onComplete: () => {
                            setCurrIndx(nextIndx);
                            setTimeout(() => {
                                setIsScrolling(false);
                                lenis.start();
                            }, 300);
                        },
                    });
                }
            };

            lenis.on("scroll", handleScroll);

            return () => {
                lenis.off("scroll", handleScroll);
            };
        }
    }, [
        windowStatus,
        isMobile,
        lenis,
        panels,
        currIndx,
        isScrolling,
        scrollableFromDoc,
        clientVisibleHeight,
        functionalScrolling,
    ]);

    useEffect(() => {
        const windH = windowStatus.innerWidth;

        if (windH <= 768) setIsMobile(true);

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [windowStatus]);

    useGSAP(
        () => {
            if (isMobile) return;

            tl.current = gsap
                .timeline({
                    defaults: {
                        ease: "none",
                    },
                    scrollTrigger: {
                        trigger: container.current,
                        pin: true,
                        once: true,
                        scrub: 0.01,
                        fastScrollEnd: true,
                        preventOverlaps: true,
                        end: `${scrollContainer.current!.scrollWidth} bottom`,
                        onEnter: () => {
                            setScrollableFromDoc(
                                document.documentElement.scrollHeight
                            );
                            setClientVisibleHeight(
                                document.documentElement.clientHeight
                            );
                        },
                    },
                })
                .to(
                    scrollContainer.current,
                    {
                        x: container.current!.clientWidth,
                        xPercent: -100,
                    },
                    0
                );

            return () => {
                if (tl.current) tl.current.kill();
            };
        },
        { scope: container, dependencies: [isMobile] }
    );

    const handleMoveToSection = (indx: number, midx: string) => {
        if (
            !lenis ||
            !panels.length ||
            scrollableFromDoc === 0 ||
            clientVisibleHeight === 0
        )
            return;

        const availableScroll =
            (scrollableFromDoc - clientVisibleHeight) / (panels.length - 1);

        console.log(tagsMobile[tagsMobile.indexOf(midx)]);

        let scrollPx = availableScroll * indx;

        if (indx == panels.length - 1) {
            scrollPx = scrollPx - 1;
        }
        setFunctionalScrolling(true);
        setIsScrolling(true);
        lenis.stop();
        lenis.scrollTo(
            isMobile ? `.${s[tagsMobile[tagsMobile.indexOf(midx)]]}` : scrollPx,
            {
                force: true,
                lock: true,
                onComplete: () => {
                    setCurrIndx(indx);
                    setTimeout(() => {
                        setIsScrolling(false);
                        setFunctionalScrolling(false);
                        lenis.start();
                    }, 300);
                },
            }
        );
    };

    return (
        <CaseStudyWrapper>
            <main ref={container} className={s.main}>
                <div ref={scrollContainer} className={s.scrollContainer}>
                    <div className={`${s.panel}`}>
                        <Cover
                            data={{
                                asFullCaseStudy:
                                    project.attributes.AsFullCaseStudy,
                                image: project.attributes.Cover.data,
                                title: project.attributes.Title,
                                subtitle: project.attributes.Subtitle,
                                category: project.attributes.Category,
                            }}
                        />
                    </div>
                    <div className={`${s.panel}`}>
                        <ContentMenu
                            tags={tagsMobile}
                            handleMoveToSection={handleMoveToSection}
                            data={project}
                        />
                    </div>
                    {project.attributes[ContentSectionName.INTRODUCTION] && (
                        <div className={`${s.panel}`}>
                            <span className={`${s[tagsMobile[0]]}`}></span>
                            <Introduction
                                data={{
                                    intro: project.attributes[
                                        ContentSectionName.INTRODUCTION
                                    ],
                                    location: project.attributes.Location,
                                    eventDate: project.attributes.EventDate,
                                }}
                            />
                        </div>
                    )}

                    {project.attributes.Case_Study_Video.data && (
                        <div className={`${s.panel}`}>
                            <CaseStudyVideo
                                data={project.attributes.Case_Study_Video.data}
                            />
                        </div>
                    )}

                    <ContentSections
                        tags={tagsMobile.slice(1, 4)}
                        isScrolling={isScrolling}
                        functionalScrolling={functionalScrolling}
                        data={PROJECT_CONTENTS}
                    />

                    {imagesContent.length > 0 && (
                        <div className={`${s.panel}`}>
                            <GalleryCarousel data={project.attributes} />
                        </div>
                    )}

                    {props.data.related.length > 0 && (
                        <div className={`${s.panel}`}>
                            <RelatedProjectsCarousel
                                data={props.data.related}
                            />
                        </div>
                    )}
                </div>
            </main>
        </CaseStudyWrapper>
    );
}
