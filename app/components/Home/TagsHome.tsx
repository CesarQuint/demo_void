import React from "react";
import AnimatedStackedCards from "../StackedCards/AnimatedStackedCards";
import { about_us_tags } from "../../constants/tags_text";
import { motion } from "framer-motion";
import Tags from "../tags";
import useWindow from "@/app/utils/hooks/useWindow";

const TagsHome = () => {
    const window = useWindow();

    return (
        <motion.div
            style={{
                width: "100%",
                boxSizing: "border-box",
                position: "relative",
            }}
        >
            {window && window.innerWidth > 768 ? (
                <Tags contentArr={about_us_tags} />
            ) : (
                <AnimatedStackedCards content={about_us_tags} />
            )}
        </motion.div>
    );
};

export default TagsHome;
