import { motion } from "framer-motion";
import Tags from "../tags";
import { about_us_tags } from "@/app/constants/tags_text";
import styles from "../../css/About/process.module.css";

type Props = {};

const Process = (props: Props) => {
  return (
    <motion.section className={styles.main}>
      <h2 className={styles.title}>NUESTRO PROCESO</h2>
      <Tags contentArr={about_us_tags} />
    </motion.section>
  );
};

export default Process;
