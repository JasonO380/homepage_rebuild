import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./aboutme_output.css";

const AboutMeOutput = (props) => {
    console.log(props.items);
    return (
        <motion.div
            key={props.items}
            initial={{
                height: 0,
                opacity: 0,
            }}
            animate={{
                opacity: 1,
                height: "auto",
                transition: { delayChildren:.2 },
            }}
            exit={{
                height: 0,
                opacity: 0,
            }}
            className="output_container"
        >
            {props.items.map((data) => {
                return <motion.p>{data}</motion.p>;
            })}
        </motion.div>
    );
};

export default AboutMeOutput;
