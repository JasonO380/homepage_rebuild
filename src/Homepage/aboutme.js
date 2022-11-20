import React, { useState } from "react";
import aboutMeData from "./aboutme_data";
import AboutMeOutput from "./aboutme_output";
import trainingData from "./training_data";
import { MdArrowDropDownCircle } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import "./aboutme.css";

let items;
const AboutMe = () => {
    let data;
    const trainingTitle = trainingData.map((data) => data.title);
    const bioTitle = aboutMeData.map((data) => data.title);
    const [listItems, setListItems] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [isRotate, setIsRotate] = useState(false);
    const accordionToggle = (event) => {
        data = event.target.id;
        console.log(data);
        if (data === "Jason Ollada") {
            aboutMeData.map((data) => {
                items = data.description;
                setListItems(items);
            });
        }
        if (data === "Methodology") {
            trainingData.map((data) => {
                items = data.methods;
                setListItems(items);
            });
        }
        if (!isOpen) {
            setIsOpen(true);
            // setIsRotate(true);
        } else {
            accordionFlip()
        }
        console.log(isOpen);
    };

    //helper function to flip div
    const accordionFlip = () => {
        setIsOpen(false);
        console.log(listItems);
        console.log(items);
        if (listItems !== items) {
            setIsOpen(true);
            setIsRotate(true);
            console.log("different");
        }
        if (listItems === items) {
            console.log("same");
            setIsRotate(false);
            setIsOpen(false);
            items = "";
        }
    };

    return (
        <React.Fragment>
            <div className="about_me_wrapper">
                <div className="about_me_container">
                    <motion.h3
                        id={bioTitle}
                        onClick={accordionToggle}
                        whileTap={{ scale: 0.8 }}
                        className="action_button"
                    >
                        {bioTitle} <MdArrowDropDownCircle />
                    </motion.h3>
                </div>
                <div className="about_me_container">
                    <motion.h3
                        id={trainingTitle}
                        onClick={accordionToggle}
                        whileTap={{ scale: 0.8 }}
                        className="action_button"
                    >
                        {trainingTitle} <MdArrowDropDownCircle />
                    </motion.h3>
                </div>
            </div>
            <AnimatePresence mode="wait">
            <motion.div
                key={items}
                initial={{
                    height: 0,
                    opacity: 0,
                }}
                animate={{
                    rotateY: 360,
                    opacity: 1,
                    margin: "auto",
                    height: "auto",
                    transition: {
                        staggerChildren:.01,
                        duration: 0.45,
                    },
                }}
                exit={{
                    height: 0,
                    opacity: 0,
                }}
                className="output_wrapper"
            >
                {isOpen && <AboutMeOutput items={items} />}
            </motion.div>
            </AnimatePresence>
        </React.Fragment>
    );
};

export default AboutMe;
