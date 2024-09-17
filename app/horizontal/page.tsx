"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import s from "../css/horizontal.module.css";
import { ScrollTrigger, Draggable } from "gsap/all";
import RelatedProyectsCarrousel from "../components/About/RelatedProyectsCarrousel";
import GalleryCarousel from "../components/case-study/section-components/Gallery";
import { ContentSectionName, Project } from "../Strapi/interfaces/Entities/Project";
import CaseStudyWrapper from "../components/Horizontal/CaseStudyWrapper";
import Cover from "../components/case-study/section-components/Cover";
import ContentSections, { ContentSectionsProps } from "../components/case-study/section-components/ContentSections";
import ContentMenu, { sectionHasContent } from "../components/case-study/section-components/ContentMenu";
import Introduction from "../components/case-study/section-components/Introduction";
import CaseStudyVideo from "../components/case-study/section-components/IntroductoryVideo";

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable);

export default function Horizontal(props: { data: { project: Project, related: Project[] } }) {
    const [isMobile, setIsMobile] = useState(false);
    const container = useRef<HTMLElement>(null);
    const scrollContainer = useRef<HTMLDivElement>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);

    const project = props.data.project;

    const PROJECT_CONTENTS: ContentSectionsProps['data'] = [
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

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useGSAP(() => {
        if (isMobile) return;

        tl.current = gsap
            .timeline({
                defaults: {
                    ease: "none",
                },
                scrollTrigger: {
                    trigger: container.current,
                    pin: true,
                    scrub: 0.01,
                    fastScrollEnd: true,
                    preventOverlaps: true,
                    end: `${scrollContainer.current!.scrollWidth} bottom`,
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
    }, { scope: container, dependencies: [isMobile] });

    return (
        <CaseStudyWrapper>
            <main ref={container} className={s.main}>
                <div ref={scrollContainer} className={s.scrollContainer}>
                    <Cover
                        data={{
                            image: project.attributes.Cover.data,
                            title: project.attributes.Title,
                            subtitle: project.attributes.Subtitle,
                            category: project.attributes.Category,
                        }}
                    />
                    <div className={s.wrapper}>
                        <ContentMenu data={project} />
                        <Introduction
                            data={{
                                intro: project.attributes[ContentSectionName.INTRODUCTION],
                                location: project.attributes.Location,
                                eventDate: project.attributes.EventDate,
                            }} />
                        <CaseStudyVideo data={project.attributes.Case_Study_Video.data} />
                        <ContentSections data={PROJECT_CONTENTS} />
                        <GalleryCarousel data={project.attributes} />
                        <RelatedProyectsCarrousel data={props.data.related} />
                    </div>
                </div>
            </main>
        </CaseStudyWrapper>
    );
}
