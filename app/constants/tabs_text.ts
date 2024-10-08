export interface TabData {
    title: string;
    icon: string;
    content: string[];
}

export const about_us_tabs: TabData[] = [
    {
        title: "En vivo",
        icon: "https://voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com/icons/Live-01.png",
        content: [
            "Diseñamos espectáculos que sorprenden y despiertan los sentidos, utilizando el “wow factor” para crear momentos verdaderamente inolvidables.",
            "Estas experiencias son ideales para eventos artísticos, corporativos y culturales, garantizando una conexión emocional y memorable con el público.",
        ],
    },
    {
        title: "Realidad Extendida",
        icon: "https://voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com/icons/Extended-Reality-01.png",
        content: [
            "Fusionamos la tecnología con la realidad para crear experiencias que expanden la percepción de los usuarios mediante la integración de elementos virtuales con el mundo físico.",
            "Estas aplicaciones son ideales para experiencias de realidad aumentada, mixta y virtual, ofreciendo un nuevo nivel de interacción y conexión con el entorno. ",
        ],
    },
    {
        title: "Experiencias Inmersivas",
        icon: "https://voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com/icons/Immersive-01.png",
        content: [
            "Creamos una oportunidad para conectar de manera profunda y significativa con el público a través de estímulos sensoriales que no solo ofrecen aprendizaje e información de valor, sino que también inspiran y transmiten sensaciones.",
            "Estas aplicaciones son ideales para museos, activaciones de marca y eventos culturales, que transforman cada espacio en un escenario de descubrimiento y emoción.",
        ],
    },
];
