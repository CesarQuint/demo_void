import { forwardRef, useEffect, useRef, useState } from "react";
import { Project } from "../../../Strapi/interfaces/Entities/Project";
import { ContentSectionName } from "../../../Strapi/interfaces/Entities/Project";
import Code, { CodeProps } from "../content-components/content-types/Code";
import Paragraph, {
    ParagraphProps,
} from "../content-components/content-types/Paragraph";
import ContentImage, {
    ImageProps,
} from "../content-components/content-types/Image";
import Heading, {
    HeadingProps,
} from "../content-components/content-types/Heading";
import List, { ListProps } from "../content-components/content-types/List";
import Quote, { QuoteProps } from "../content-components/content-types/Quote";
import {
    ContentSectionTitles,
    mapToSubIndexData,
    SubIndexData,
} from "./ContentMenu";
import styles from "./ContentSections.module.css";
import gsap from "gsap";
import { Observer } from "gsap/all";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export type ContentData = Array<
    | CodeProps["data"]
    | ParagraphProps["data"]
    | ImageProps["data"]
    | HeadingProps["data"]
    | ListProps["data"]
    | QuoteProps["data"]
>;

export type ContentSectionData = Project["attributes"][ContentSectionName];

export type ContentSectionsProps = {
    data: {
        data: ContentData | null;
        name: ContentSectionName;
    }[];
};

type SectionProps = { ref: () => void; data: ContentSectionsProps["data"][0] };

const ContentSwitch = (
    content: ContentData[0],
    idx: number,
): React.JSX.Element => {
    switch (content.type) {
        case "code":
            return <Code data={content} key={idx} />;
        case "paragraph":
            return <Paragraph data={content} key={idx} />;
        case "heading":
            return <Heading data={content} key={idx} />;
        case "list":
            return <List data={content} key={idx} />;
        case "quote":
            return <Quote data={content} key={idx} />;
        case "image":
            return <ContentImage data={content} key={idx} />;
        default:
            throw new TypeError("Unexpected content type");
    }
};

const ContentSection: React.FC<{ data: ContentData }> = ({ data }) =>
    data.map((content, idx) => ContentSwitch(content, idx));

const Section = forwardRef<HTMLDivElement, SectionProps>(
    ({ data: content }, ref) => {
        const [activeSection, setActiveSection] = useState(0);
        const contentChunks: ContentData[] = chunkArrayEveryHeading(
            content.data ?? [],
        );

        const headings: SubIndexData[] = contentChunks
            .map((chunk): ContentData[0] => chunk[0])
            .map((content) => mapToSubIndexData([content]))
            .map(([subindex], idx) => ({
                index: idx,
                title: subindex?.title ?? "introducción",
            }));

        return (
            <section
                ref={ref}
                id={content.name}
                className={styles.contentSection}
            >
                <h1 className={styles.title}>
                    {ContentSectionTitles[content.name].title}
                </h1>

                <div className={styles.innerContent}>
                    {headings.length > 1 && (
                        <div className={styles.sideMenu}>
                            <ul className={styles.menuList}>
                                {headings.map((heading, idx) => (
                                    <li
                                        key={idx}
                                        className={styles.sideMenuItem}
                                        onClick={() =>
                                            setActiveSection(heading.index)
                                        }
                                    >
                                        <span>{heading.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className={styles.content}>
                        {content.data && (
                            <ContentSection
                                data={contentChunks[activeSection]}
                            />
                        )}
                    </div>
                </div>
            </section>
        );
    },
);

Section.displayName = "Section";

const ContentSections: React.FC<ContentSectionsProps> = ({ data }) => {
    const observerRef = useRef<Observer>();
    const sectionsRef = useRef<HTMLDivElement[]>([]);
    const scrollTweenRef = useRef<gsap.core.Tween | null>();

    useEffect(() => {
        // Check if we're in the browser environment
        if (typeof window === "undefined") return;

        const sections = sectionsRef.current;

        if (ScrollTrigger.isTouch === 1) {
            observerRef.current = ScrollTrigger.normalizeScroll(true);
        }

        const goToSection = (index: number) => {
            scrollTweenRef.current = gsap.to(window, {
                scrollTo: {
                    y: index * window.innerHeight,
                    autoKill: false,
                },
                onStart: () => {
                    if (observerRef.current) {
                        observerRef.current.disable();
                        observerRef.current.enable();
                    }
                },
                duration: 1,
                onComplete: () => (scrollTweenRef.current = null),
                overwrite: true,
            });
        };

        sections.forEach((panel, i) => {
            ScrollTrigger.create({
                trigger: panel,
                start: "top bottom",
                end: "+=199%",
                onToggle: (self) => {
                    if (self.isActive && !scrollTweenRef.current)
                        goToSection(i);
                },
            });
        });

        ScrollTrigger.create({
            start: 0,
            end: "max",
            snap: 1 / (sections.length - 1),
        });

        const handleTouchStart = (e: Event) => {
            if (scrollTweenRef.current) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        };

        document.addEventListener("touchstart", handleTouchStart, {
            capture: true,
            passive: false,
        });

        return () => {
            document.removeEventListener("touchstart", handleTouchStart);
            ScrollTrigger.killAll();
            if (observerRef.current) observerRef.current.kill();
        };
    }, []);

    return data
        .filter((content) => Boolean(content.data))
        .map((content, idx) => (
            <Section
                key={idx}
                ref={(el: HTMLDivElement) =>
                    void (sectionsRef.current[idx] = el)
                }
                data={content}
            />
        ));
};

const chunkArrayEveryHeading = (content: ContentData): ContentData[] =>
    content.reduce(
        (acc: ContentData[], curr: ContentData[0]) => (
            curr.type === "heading"
                ? acc.push([curr])
                : acc[acc.length - 1].push(curr),
            acc
        ),
        [[]],
    );

export default ContentSections;
