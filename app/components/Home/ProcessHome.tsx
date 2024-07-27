import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Tags from "../tags";
import { about_us_tags } from "@/app/constants/tags_text";
import styles from "../../css/home/processHome.module.css";
import Image from "next/image";

type Props = {};

const ProcessHome = (props: Props) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {}, [imgLoaded]);
  return (
    <motion.section className={styles.main}>
      <h2 className={styles.title}>NUESTRO PROCESO</h2>
      <Image
        onLoad={() => {
          setImgLoaded(true);
        }}
        className={styles.image}
        src={
          "https://voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com/thumbnails/process-01.jpg"
        }
        alt="Process image"
        width={1000}
        height={1000}
      />
      <motion.div className={styles.description}>
        <p>
          Somos un grupo de artistas digitales apasionados por la tecnología y
          la comunicación, expertos en crear experiencias para solucionar los
          retos que enfrentan nuestros clientes y comunicar nuestras propias
          ideas.
        </p>
      </motion.div>
    </motion.section>
  );
};

export default ProcessHome;
