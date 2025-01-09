import { motion } from "framer-motion";
import Tags from "../tags";
import { about_us_tags } from "../../constants/tags_text";
import styles from "../../css/About/process.module.css";
import AnimatedStackedCards from "../StackedCards/AnimatedStackedCards";
import useWindow from "@/app/utils/hooks/useWindow";

type Props = {};

const Process = (props: Props) => {
    const window = useWindow();

    return (
        <motion.section className={styles.main}>
            <h2 className={styles.title}>NUESTRO PROCESO</h2>
            {window && window.innerWidth > 768 ? (
                <Tags contentArr={about_us_tags} />
            ) : (
                <AnimatedStackedCards content={about_us_tags} />
            )}
        </motion.section>
    );
};

export default Process;
