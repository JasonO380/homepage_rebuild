import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import "./aboutme_output.css";

const AboutMeOutput = (props) => {
    console.log(props.items);
    console.log(props.animate)
    const animate = props.animate;
    return (
        <motion.div
            className="output_container"
        >
            {props.items.map((data) => {
                return <motion.p
                initial="offscreen"
                animate="onscreen"
                variants={animate}>{data}</motion.p>;
            })}
        </motion.div>
    );
};

export default AboutMeOutput;
