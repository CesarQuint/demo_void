import React from "react";
import styles from "../../css/About/manifest.module.css";

type Props = {};

const Manifest = (props: Props) => {
    return (
        <section className={styles.manifest_container}>
            <h2>NUESTRO MANIFIESTO</h2>
            <div className={styles.manifest_more_info}>
                <p>
                    En voidXR canalizamos la creatividad en experiencias
                    inmersivas únicas para marcas, museos y centros educativos.
                </p>
                <p>
                    Nuestra especialización técnica garantiza soluciones sólidas
                    y confiables, diseñadas para maximizar el retorno de
                    inversión para nuestros clientes.
                </p>
                <p>
                    Trabajamos con metodologías perfeccionadas que aseguran
                    procesos fluidos y transparentes, brindando certeza y
                    tranquilidad en cada etapa del proyecto. Nuestra misión es
                    materializar vivencias donde los sentidos y las emociones se
                    entrelazan.
                </p>
            </div>
        </section>
    );
};

export default Manifest;
