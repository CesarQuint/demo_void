"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import s from "../css/horizontal.module.css";
import { ScrollTrigger, Draggable } from "gsap/all";
import RelatedProyectsCarrousel from "../components/About/RelatedProyectsCarrousel";
import { Project, SectionBlock, HeadingProps } from "../Strapi/interfaces/Entities/Project";
import { ImageFormat } from "../Strapi/interfaces/Entities/ImageFormat";

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable);

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
      throw Error('Unknown level: ' + level);
  }
}

function ImageSection(props: { data: ImageFormat }) {
  return (
    <section className={s.imgSection}>
      <Image
        style={{ objectFit: "cover" }}
        title={props.data.caption ?? ''}
        src={process.env.NEXT_PUBLIC_STRAPI_BASE_URL + props.data.formats.medium.url}
        fill
        sizes="50%"
        alt={props.data.alternativeText ?? ''}
      />
    </section>
  );
}

function SectionComponent({ data }: { data: SectionBlock & HeadingProps & { image: ImageFormat } }) {
  switch (data.type) {
    case 'heading':
      return (<Heading level={data.level ?? 0} type={data.type}>{data.children}</Heading>);

    case 'paragraph':
      return (<>{data.children.map((block, idx) => (<p key={idx}>{block.text}</p>))}</>);

    case 'image':
      return <ImageSection data={data.image} />

    default:
      throw Error('Unknown type: ' + data.type);
  }
}

export default function Horizontal(props: { data: { project: Project[] } }) {
  const container = useRef<HTMLElement>(null);
  const tags = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const project = props.data.project[0];

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
    <main ref={container} className={s.main}>
      <div ref={scrollContainer} className={s.scrollContainer}>
        <section
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage:
              " linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4640449929971989) 40%, rgba(0,0,0,0) 100%),url(https://voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com/thumbnails/14-k-thumbnail-01.png)",
          }}
          className={s.hero}
        >
          <div className={s.title}>
            <h1>{project.attributes.Title.toUpperCase()}</h1>
            <h2>{project.attributes.Subtitle.toUpperCase()}</h2>
          </div>

          <div ref={tags} className={s.tags}>
            <div className={s.tag}>{project.attributes.Category.data.attributes.Name}</div>
          </div>
        </section>

        <div className={s.wrapper}>
          <section className={s.links}>
            <a href="#intro">intro</a>
            <a href="#conceptualizacion">conceptualización</a>
            <a href="#desarrollo">desarrollo</a>
            <a href="#produccion">producción</a>
            <a href="#conclusion">conclusión</a>
            <a href="#referencias">referencias</a>
            <a href="#alianzas">alianzas</a>
            <a href="#galeria">galería</a>
          </section>
          <section id="intro" className={s.intro}>
            <p className={s.date}>{project.attributes.EventDate}</p>
            <p>UBICACIÓN: {project.attributes.Location}</p>
            {project.attributes.Introduction.map((content, idx) => (<SectionComponent key={idx} data={content} />))}

            <p className={s.txt}>
              La locación que escogimos es parte de las 65,721 hectáreas del
              corredor biológico Chichinautzin, hogar de 315 especies de hongos
              y 785 especies de plantas.
              <br />
              <br />
              Escogimos este lugar por sus características geológicas y densidad
              biológica que permiten proyectar e iluminar sus rocas y árboles.
            </p>

            <div className={s.introDescription}>
              <h3 className={s.title}>Un homenaje a la creación orgánica</h3>
              <p className={s.txt}>
                Conceptualizamos y desarrollamos 3 video instalaciones en el
                bosque de Tepoztlán a través de la especialidad de cada
                integrante del crew de voidXR. El resultado fueron 3 piezas que
                hacen homenaje a la creación orgánica e integral que admiramos y
                aprendemos de la naturaleza.
              </p>
            </div>
          </section>
          <section className={s.imgSection}>
            <img
              src="https://img.freepik.com/free-photo/sunset-silhouettes-trees-mountains-generative-ai_169016-29371.jpg"
              alt=""
            />
          </section>
          <section id="concepto" className={s.card}>
            <h3 className={s.title}>Concepto</h3>
            <p className={s.info}>
              El proyecto surgió a partir de la búsqueda de desarrollar una
              pieza interna que hiciera referencia a la simbiosis. Nos llamó
              mucho la atención el tema de la interconexión biológica de los
              árboles y plantas del bosque a través de redes del Micelio
              (hongos).
            </p>
            <p className={s.extra}>
              Reflexionamos sobre la similitud entre este fenómeno y el trabajo
              creativo colectivo que llevamos a cabo en voidXR y a partir de
              éste, se definió que el proyecto debía llevarse a cabo en un
              entorno natural.
            </p>
          </section>
          <section id="desarrollo" className={s.card}>
            <h3 className={s.title}>Desarrollo</h3>
            <p className={s.info}>
              Se comenzó a animar el contenido basándonos en retículas del
              espacio y se hicieron pruebas en nuestras oficinas para la
              instalación interactiva.
            </p>
            <p className={s.extra}>
              Una vez analizados los retos técnicos y medidas del espacio por
              medio de un scouting, se definieron las características y
              requerimientos del equipo necesario para llevar a cabo las
              instalaciones.
            </p>
          </section>
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
                  Iluminación: A través de 2 robóticas y 4 Par leds posicionados
                  estratégicamente, iluminamos secciones del bosque para obtener
                  profundidad que destacara las piezas de mapping y los
                  elementos naturales del bosque.
                </li>
                <li>
                  Animación: Con retículas generadas a partir de imágenes del
                  lugar, se crearon animaciones 2D que hicieran referencia a los
                  procesos de interconexión y simbiosis presentes en el bosque.
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
          <section id="produccion" className={s.card}>
            <h3 className={s.title}>Producción</h3>
            <p className={s.info}>
              Paralelo a la programación y animación del contenido, se planeó el
              viaje, el transporte, hospedaje y se creó un minute-by-minute del
              montaje para asegurarnos de montar, operar y grabar cada
              instalación con tiempo suficiente para obtener el resultado
              planteado desde la conceptualización del proyecto.
            </p>
            <p className={s.extra}>
              El proceso de planeación adecuado de un proyecto permite que éste
              se lleve a cabo en tiempo y forma, propiciando un mejor desarrollo
              de inicio a fin. La planeación implica realizar cronogramas con un
              deadline, en donde se involucra la parte creativa, las necesidades
              para el desarrollo e implementación del proyecto y la operación en
              sitio, siempre respondiendo a ¿cómo?, ¿cuándo?, ¿dónde? y ¿con
              qué? con el fin de resolver técnicamente el concepto creativo.
              Para lo anterior es necesario tener un sistema de procesos que
              involucre a todo el crew y así garantizar el éxito de cualquier
              proyecto.
            </p>
          </section>
          <section className={s.imgSection}>
            <img
              src="https://img.freepik.com/free-photo/sunset-silhouettes-trees-mountains-generative-ai_169016-29371.jpg"
              alt=""
            />
          </section>
          <section className={s.imgSection}>
            <img
              src="https://img.freepik.com/free-photo/sunset-silhouettes-trees-mountains-generative-ai_169016-29371.jpg"
              alt=""
            />
          </section>
          <section className={s.relatedProjects}>
            <RelatedProyectsCarrousel />
          </section>
        </div>
      </div>
    </main>
  );
}
