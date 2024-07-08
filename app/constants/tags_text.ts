export interface AboutUsTag {
  number: string;
  title: string;
  content: string[];
}

export const about_us_tags: AboutUsTag[] = [
  {
    number: "01",
    title: "Conceptualización",
    content: [
      "Etapa fundamental dónde buscamos explorar y traer ideas creativas y abstractas a la realidad.",
      "Este proceso implica la generación y definición de ideas y conceptos que servirán como la base para el diseño y ejecución del proyecto.",
    ],
  },
  {
    number: "02",
    title: "Desarrollo",
    content: [
      "Donde las ideas y conceptos definidos en la fase de conceptualización se convierten en realidad tangible.",
      "Una serie de pasos técnicos y logísticos que aseguran la correcta implementación de las instalaciones y la experiencia interactiva.",
    ],
  },
  {
    number: "03",
    title: "Producción",
    content: [
      "Abarca desde la logística hasta la implementación final de las instalaciones, asegurando que todo se ejecute conforme a lo previsto.",
      "Este plan detallado garantiza que cada fase del proyecto se complete con suficiente tiempo para alcanzar los resultados esperados desde la conceptualización.",
    ],
  },
];
