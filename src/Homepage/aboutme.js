import React, { useState } from "react";
import aboutMeData from "./aboutme_data";
import AboutMeOutput from "./aboutme_output";
import trainingData from "./training_data";
import { MdArrowDropDownCircle } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import buttonStyle from "../CSS/variables/button_style";
import "./aboutme.css";

let items;
const AboutMe = () => {
    let data;
    const trainingTitle = trainingData.map((data) => data.title);
    const bioTitle = aboutMeData.map((data) => data.title);
    const [listItems, setListItems] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [isRotate, setIsRotate] = useState(false);
    const variants = {
        offscreen:{y: -10},
        onscreen:{y:0,
        transition:{type:"spring",
        bounce:.5,
        duration:.8}}
    }
    const accordionToggle = (event) => {
        data = event.target.id;
        console.log(data);
        if (data === "Jason Ollada") {
            aboutMeData.map((data) => {
                items = data.description;
                setListItems(items);
            });
        }
        if (data === "Training") {
            trainingData.map((data) => {
                items = data.methods;
                setListItems(items);
            });
        }
        if (!isOpen) {
            setIsOpen(true);
        } else {
            accordionFlip();
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
                    <motion.button
                        id={bioTitle}
                        onClick={accordionToggle}
                        whileTap={{ scale: 0.8 }}
                        style={buttonStyle}
                    >
                        {bioTitle} 
                    </motion.button>
                </div>
                <div className="about_me_container">
                    <motion.button
                        id={trainingTitle}
                        onClick={accordionToggle}
                        whileTap={{ scale: 0.8 }}
                        style={buttonStyle}
                    >
                        {trainingTitle} 
                    </motion.button>
                </div>
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={items}
                    initial={{
                        scale: 0,
                        opacity: 0,
                    }}
                    animate={{
                        rotateY: [0, 180, -180,180,0],
                        opacity: 1,
                        margin: "auto",
                        scale: [.8 ,1, .8, 1, .8, 1],
                        transition: {
                            duration: 0.75,
                            type:"spring",
                            bounce: .5,
                            staggerChildren:.5
                        },
                    }}
                    exit={{
                        scale: 0,
                        opacity: 0,
                    }}
                    className="output_wrapper"
                >
                    {isOpen && <AboutMeOutput animate={variants} items={items} />}
                </motion.div>
            </AnimatePresence>
        </React.Fragment>
    );
};

export default AboutMe;
