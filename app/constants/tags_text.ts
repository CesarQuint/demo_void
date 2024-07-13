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
      "Todo empieza con una idea. En esta primera fase, nos sumergimos en las necesidades del proyecto. Explorando cada detalle y objetivo junto con nuestros clientes buscamos destilar el mensaje esencial que queremos transmitir a nuestros usuarios.",
      "Aquí, construimos la narrativa y la experiencia del usuario, creando la base sólida sobre la cual se desarrollará el diseño de contenido y la ejecución técnica.",
    ],
  },
  {
    number: "02",
    title: "Diseño",
    content: [
      "Partiendo desde una idea clave, nos adentramos en la exploración creativa para desarrollar una fusión perfecta entre el concepto y las técnicas visuales.",
      "Agregamos valor a la narrativa, logrando una armonía entre funcionalidad y arte buscando que cada pieza no solo comunique efectivamente sino que también inspire y emocione a la audiencia.",
    ],
  },
  {
    number: "03",
    title: "Producción",
    content: [
      "En la fase de producción, transformamos la visión en realidad. Con pasos técnicos y logísticos, desarrollamos la pieza de forma tangible, ajustando cada detalle en el espacio físico. ",
      "Aseguramos la correcta implementación de las instalaciones y la experiencia interactiva, creando un impacto memorable y auténtico para todos los involucrados.",
    ],
  },
  {
    number: "04",
    title: "Integración",
    content: [
      "Finalmente, damos vida a la pieza, donde convergen todas las áreas. Desde arte y diseño de experiencia hasta el desarrollo técnico y de producción, creamos una obra que empuja los límites del arte y la tecnología, brindando una experiencia única e innovadora."
    ]
  }
];
