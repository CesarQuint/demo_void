"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import s from "../css/horizontal.module.css";
import { ScrollTrigger, Draggable } from "gsap/all";
import RelatedProyectsCarrousel from "../components/About/RelatedProyectsCarrousel";
import CarouselCaseStudy from "../components/Horizontal/CarouselCaseStudy";
import {
  Project,
  SectionBlock,
  HeadingProps,
} from "../Strapi/interfaces/Entities/Project";
import { ImageFormat } from "../Strapi/interfaces/Entities/ImageFormat";
import CaseStudyWrapper from "../components/Horizontal/CaseStudyWrapper";

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable);

export enum ContentSections {
  Introduction = "Introducción",
  Conceptualization = "Conceptualización",
  Development = "Desarrollo",
  Production = "Producción",
  MultimediaComponents = "Componentes Multimedia",
  Videomapping = "Videomapping",
  Illumination = "Iluminación",
  Animation = "Animación",
  Interactivity = "Interactividad",
  Credits = "Créditos",
}

function Heading({ level, children }: HeadingProps) {
  switch (level) {
    case 1:
      return <h1 className={s.title}>{children[0].text}</h1>;

    case 2:
      return <h2 className={s.title}>{children[0].text}</h2>;

    case 3:
      return <h3 className={s.title}>{children[0].text}</h3>;

    case 4:
      return <h4 className={s.title}>{children[0].text}</h4>;

    case 5:
      return <h5 className={s.title}>{children[0].text}</h5>;

    case 6:
      return <h6 className={s.title}>{children[0].text}</h6>;

    default:
      throw Error("Unknown level: " + level);
  }
}

function ImageSection(props: { data: ImageFormat }) {
  const bestFormat =
    props.data.formats.medium ??
    props.data.formats.small ??
    props.data.formats.thumbnail;

  return (
    <section>
      <Image
        className={s.img_new}
        style={{ objectFit: "cover" }}
        title={props.data.caption ?? ""}
        src={process.env.NEXT_PUBLIC_STRAPI_BASE_URL + bestFormat.url}
        width={1000}
        height={1000}
        sizes="50%"
        alt={props.data.alternativeText ?? ""}
      />
    </section>
  );
}

function SectionComponent({
  data,
}: {
  data: SectionBlock & HeadingProps & { image: ImageFormat };
}) {
  switch (data.type) {
    case "heading":
      return (
        <Heading level={data.level ?? 0} type={data.type}>
          {data.children}
        </Heading>
      );

    case "paragraph":
      return (
        <>
          {data.children.map((block, idx) => (
            <p key={idx}>{block.text}</p>
          ))}
        </>
      );

    case "image":
      return <ImageSection data={data.image} />;

    default:
      throw Error("Unknown type: " + data.type);
  }
}

function handleNavClick(
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  id: string
) {
  e.preventDefault(); // Prevent the default anchor behavior

  // Find the target section by ID
  const targetSection = document.getElementById(id);

  // Scroll to the section with smooth behavior
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Horizontal(props: { data: { project: Project[] } }) {
  const container = useRef<HTMLElement>(null);
  const tags = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);


  console.log(Object.keys(project.attributes));

  useGSAP(
    () => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const tagsHeight = tags.current?.offsetHeight;
      gsap.set(container.current, { "--tags-size": tagsHeight });

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
            // markers: true,
            start: `bottom+=${tagsHeight} bottom`,
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
    },
    { scope: container, dependencies: [] }
  );

  return (
    <CaseStudyWrapper>
      <main ref={container} className={s.main}>
        <div ref={scrollContainer} className={s.scrollContainer}>
          <section
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4640449929971989) 40%, rgba(0,0,0,0) 100%),url(https://voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com/thumbnails/${project.attributes.Cover.data.attributes.name})`,
            }}
            className={s.hero}
          >
            <div className={s.title}>
              <h1>{project.attributes.Title.toUpperCase()}</h1>
              <h2>{project.attributes.Subtitle.toUpperCase()}</h2>
            </div>

            <div ref={tags} className={s.tags}>
              <div className={s.tag}>
                {project.attributes.Category.data.attributes.Name}
              </div>
            </div>
          </section>

          <div className={s.wrapper}>
            <section className={s.links}>
              <section className={s.inner_links}>
                {Object.keys(project.attributes).map((tag) => {
                  const sectionId =
                    ContentSections[tag as keyof typeof ContentSections];
                  if (sectionId) {
                    return (
                      <a
                        key={tag}
                        href={`#${sectionId}`}
                        onClick={(e) => handleNavClick(e, sectionId)}
                      >
                        {sectionId}
                      </a>
                    );
                  }
                  return null;
                })}
                <div className={s.submenu_links}>
                  <a className={s.none_hover} href="#intro">
                    subcontext
                  </a>
                  <a className={s.none_hover} href="#conceptualizacion">
                    subcontext
                  </a>
                  <a className={s.none_hover} href="#desarrollo">
                    subcontext
                  </a>
    const project = props.data.project;
                </div>
              </section>
            </section>
            <section id="Introducción" className={s.intro}>
              <p className={s.date}>{project.attributes.EventDate}</p>
              <p>UBICACIÓN: {project.attributes.Location}</p>
              {project.attributes.Introduction.map((content, idx) => (
                <SectionComponent key={idx} data={content} />
              ))}
            </section>
            <section className={s.imgSection}>
              <img
                src={`https://voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com/thumbnails/${project.attributes.Cover.data.attributes.name}`}
                alt=""
              />
            </section>
            {project.attributes.Conceptualization && (
              <section id="Conceptualización" className={s.card}>
                <h3 className={s.title}>Concepto</h3>
                {project.attributes.Conceptualization.map((content, idx) => (
                  <SectionComponent key={idx} data={content} />
                ))}
              </section>
            )}

            {project.attributes.Development && (
              <section id="Desarrollo" className={s.card}>
                <h3 className={s.title}>Desarrollo</h3>
                {project.attributes.Development.map((content, idx) => (
                  <SectionComponent key={idx} data={content} />
                ))}
              </section>
            )}

            <section className={s.desarrollo}>
              <ul className={s.list}>
                <li className={s.li_tag}>
                  <span>Componentes Multimedia</span>
                </li>
                <li className={s.li_tag}>
                  <span>Videomapping</span>
                </li>
                <li className={s.li_tag}>
                  <span>Iluminación</span>
                </li>
                <li className={s.li_tag}>
                  <span>Animación</span>
                </li>
                <li className={s.li_tag}>
                  <span>Interactividad</span>
                </li>
              </ul>
              <div className={s.details}>
                <ul>
                  <li>
                    Videomapping: Usamos un proyector de 14K lúmenes, Resolume
                    Arena y Millumin para convertir a la naturaleza en el lienzo
                    para nuestro contenido.
                  </li>
                  <li>
                    Iluminación: A través de 2 robóticas y 4 Par leds
                    posicionados estratégicamente, iluminamos secciones del
                    bosque para obtener profundidad que destacara las piezas de
                    mapping y los elementos naturales del bosque.
                  </li>
                  <li>
                    Animación: Con retículas generadas a partir de imágenes del
                    lugar, se crearon animaciones 2D que hicieran referencia a
                    los procesos de interconexión y simbiosis presentes en el
                    bosque.
                  </li>
                  <li>
                    Interactividad: A través de un sensor, traqueamos los
                    movimientos de un performer en tiempo real, traduciendo esa
                    información en formas y partículas que fueron proyectadas en
                    la montaña.
                  </li>
                </ul>
                <figure>
                  <img
                    src="https://img.freepik.com/free-photo/sunset-silhouettes-trees-mountains-generative-ai_169016-29371.jpg"
                    alt=""
                  />
                  <figcaption>Reticula proyectada en la roca</figcaption>
                </figure>
                <figure>
                  <img
                    src="https://img.freepik.com/free-photo/sunset-silhouettes-trees-mountains-generative-ai_169016-29371.jpg"
                    alt=""
                  />
                  <figcaption>Reticula proyectada en la roca</figcaption>
                </figure>
              </div>
            </section>
            {project.attributes.Production && (
              <section id="Producción" className={s.card}>
                <h3 className={s.title}>Producción</h3>
                {project.attributes.Production.map((content, idx) => (
                  <SectionComponent key={idx} data={content} />
                ))}
              </section>
            )}

            <section className={s.imgSection}>
              <img
                src="https://img.freepik.com/free-photo/sunset-silhouettes-trees-mountains-generative-ai_169016-29371.jpg"
                alt=""
              />
            </section>
            <section className={s.imgSection}>
              <CarouselCaseStudy />
            </section>
            <section className={s.relatedProjects}>
              <RelatedProyectsCarrousel />
            </section>
          </div>
        </div>
      </main>
    </CaseStudyWrapper>
  );
}
