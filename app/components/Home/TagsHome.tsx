import React from "react";
import Tags from "../tags";
import { about_us_tags } from "@/app/constants/tags_text";
import { motion } from "framer-motion";

const TagsHome = () => {
  return (
    <motion.div
      style={{
        width: "100%",
        padding: "0 6vh",
        boxSizing: "border-box",
        position: "relative",
      }}>
      <Tags contentArr={about_us_tags} />
    </motion.div>
  );
};

export default TagsHome;
