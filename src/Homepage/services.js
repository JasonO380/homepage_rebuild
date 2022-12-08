import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import serviceData from "./service_data";
import { italics } from "../CSS/variables/fonts";
import "./services.css";

const Services = () => {
    const animation = {
        offscreen: { scale: 0 },
        onscreen: {
            scale: 1,
            transition: { type: "spring", bounce: 0.65, duration: 0.8 },
        },
    };
    return (
        <React.Fragment>
            <div className="services_header">
                <h2>SERVICES</h2>
            </div>
            <div>
                {serviceData.map((data) => {
                    return (
                        <motion.div
                            initial={"offscreen"}
                            whileInView={"onscreen"}
                            className="services_container"
                            viewport={{ once: false, amount: 1 }}
                        >
                            <motion.h3 style={italics} variants={animation}>
                                {data.title}
                            </motion.h3>
                            <motion.p style={italics} variants={animation}>
                                {data.description}
                            </motion.p>
                        </motion.div>
                    );
                })}
            </div>
        </React.Fragment>
    );
};

export default Services;
