import React from "react";
import { centerDiv } from "../CSS/variables/global-div-styles";
import { delay, motion } from "framer-motion";
import "./Loading-Spinner.css";

const LoadingSpinner = (props) => {
    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{
                scale: 1,
                transition: { type: "spring", bounce: 0.65, duration: 1.8 },
            }}
            exit={{ scale: 0 }}
            className="spinner_wrapper"
        >
            <div className="heading">
                <h3 className="spin_title">Loading</h3>
            </div>
            <div className="ball_container">
                <motion.div
                    transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                        delay: 0.1,
                        yoyo: Infinity,
                    }}
                    animate={{ y: ["100%", "-100%"] }}
                    className="ball_2"
                ></motion.div>
                <motion.div
                    transition={{
                        duration: .2,
                        ease: "easeInOut",
                        delay: 0.2,
                        yoyo: Infinity,
                    }}
                    animate={{ y: ["100%", "-100%"] }}
                    className="ball_1"
                ></motion.div>
                <motion.div
                    transition={{
                        duration: 1,
                        ease: "easeInOut",
                        yoyo: Infinity,
                    }}
                    animate={{ y: ["100%", "-100%"] }}
                    className="ball_2"
                ></motion.div>
                <motion.div
                    transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                        delay: 0.1,
                        yoyo: Infinity,
                    }}
                    animate={{ y: ["100%", "-100%"] }}
                    className="ball_1"
                ></motion.div>
                <motion.div
                    transition={{
                        duration: .2,
                        ease: "easeInOut",
                        delay: 0.2,
                        yoyo: Infinity,
                    }}
                    animate={{ y: ["100%", "-100%"] }}
                    className="ball_2"
                ></motion.div>
                <motion.div
                    transition={{
                        duration: 1,
                        ease: "easeInOut",
                        // delay:.3,
                        yoyo: Infinity,
                    }}
                    animate={{ y: ["100%", "-100%"] }}
                    className="ball_1"
                ></motion.div>
                <motion.div
                    transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                        delay: 0.1,
                        yoyo: Infinity,
                    }}
                    animate={{ y: ["100%", "-100%"] }}
                    className="ball_2"
                ></motion.div>
                <motion.div
                    transition={{
                        duration: .2,
                        ease: "easeInOut",
                        delay: 0.2,
                        yoyo: Infinity,
                    }}
                    animate={{ y: ["100%", "-100%"] }}
                    className="ball_1"
                ></motion.div>
                <motion.div
                    transition={{
                        duration: 1,
                        ease: "easeInOut",
                        // delay:.3,
                        yoyo: Infinity,
                    }}
                    animate={{ y: ["100%", "-100%"] }}
                    className="ball_2"
                ></motion.div>
                <motion.div
                    transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                        delay: 0.1,
                        yoyo: Infinity,
                    }}
                    animate={{ y: ["100%", "-100%"] }}
                    className="ball_1"
                ></motion.div>
                <motion.div
                    transition={{
                        duration: .2,
                        ease: "easeInOut",
                        delay: 0.2,
                        yoyo: Infinity,
                    }}
                    animate={{ y: ["100%", "-100%"] }}
                    className="ball_2"
                ></motion.div>
            </div>
        </motion.div>
    );
};

export default LoadingSpinner;
