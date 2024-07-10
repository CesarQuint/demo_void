"use client";
import { motion } from "framer-motion";
import Tags from "../tags";
import { about_us_tags } from "@/app/constants/tags_text";
import styles from "../../css/About/process.module.css";
import Image from "next/image";
import gift from "../../../public/gifts/void_gif.gif";

type Props = {};

const ProcessHome = (props: Props) => {
  return (
    <motion.section className={styles.main}>
      <h2 className={styles.title}>NUESTRO PROCESO</h2>
      <motion.div className={styles.gif_wrapper}>
        <Image
          width={1000}
          height={1000}
          className={styles.image_gif}
          src={gift}
          alt="Gif"
        />
      </motion.div>

      <section className={styles.description}>
        <p>
          Somos un grupo de artistas digitales apasionados por la tecnología y
          la comunicación, expertos en crear experiencias para solucionar los
          retos que enfrentan nuestros clientes y comunicar nuestras propias
          ideas.
        </p>
      </section>

      <Tags contentArr={about_us_tags} />
    </motion.section>
  );
};

export default ProcessHome;
