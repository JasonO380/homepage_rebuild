import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import macroentry from "../Images/macroentry.jpeg";
import macroview from "../Images/macroview.jpeg";
import workoutentry from "../Images/workoutentry.jpeg";
import workoutview from "../Images/workoutview.jpeg";
import info from "./fitness_tracker_data";

import "./fitness_tracker_preview.css";

const FitnessTrackerPreview = () => {
    const [rotate, setRotate] = useState(false);
    const [count, setCount] = useState(0);
    const picOptions = [macroentry, macroview, workoutentry, workoutview];
    let newPic = picOptions[count];
    const [pic, setPic] = useState(newPic);
    const animation = {
        offscreen:{x: 1000},
        onscreen:{x:0,
        transition:{type:"spring",
        bounce:.5,
        duration:.8}}
    }
    const emojiAnimation = {
        offscreen:{scale:0, x:-500},
        onscreen:{x:0, scale:[.2, .5 , .8, 1],
        rotate: [0, 90, -90,90,0],
        transition:{type:"spring",
        bounce:.65,
        duration:.8}}
    }

    const rotateNext = () => {
        setRotate(true);
        if (count < picOptions.length - 1) {
            setCount((c) => c + 1);
            console.log(count);
            setRotate(true);
            setPic(newPic);
        } else {
            setRotate(true);
            setCount(0);
            setPic(newPic);
        }
    };
    return (
        <div
        className="demo_wrapper">
            <div className="fitness_tracker_container">
                {info.map((d, index) => {
                    const img = d.emoji
                    return (
                        <AnimatePresence>
                        <motion.div
                        initial={"offscreen"}
                        whileInView={"onscreen"}
                        viewport={{once:false, amount:.6}} 
                        className="fitness_data_container">
                            <motion.p className="emoji"  key={index} variants={emojiAnimation}>{img}</motion.p>
                            <motion.p >{d.info}</motion.p>
                        </motion.div>
                        </AnimatePresence>
                    );
                })}
            </div>
            <div className="fitness_tracker_container">
                <motion.h4
                    whileTap={{ scale: 0.8 }}
                    onClick={rotateNext}
                    className="pic_demo_header"
                >
                    Preview
                </motion.h4>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={pic}
                        animate={{ rotateY: rotate ? 360 : 0 }}
                        transition={{ scale: 0.8 }}
                        className="demo_pic_holder"
                    >
                        <img className="pic" src={newPic} />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default FitnessTrackerPreview;
