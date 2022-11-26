import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./carousel.css";

const Carousel = (props) => {
    console.log(props.info);
    const color = props.color;
    const data = props.info;
    const pic = props.pic;
    console.log(color);
    const direction = props.direction;
    console.log(direction);
    const [increase, setIncrease] = useState(false);

    useEffect(()=>{
        if(direction === "plus"){
            setIncrease(true)
        } else {
            setIncrease(false)
        }
    },[direction]);
    const animation = {
        offscreen: { x: increase ? -500 : 500 },
        onscreen: {
            x: 0,
            transition: { type: "spring", bounce: 0.65, duration: 1.8 },
        },
        exit: { scale: 0 },
    };
    return (
        <div
            className="carousel_wrapper"
            // style={{ background: color }}
        >
            <AnimatePresence mode="wait">
                <motion.div
                initial={"offscreen"}
                animate={"onscreen"}
                exit={"exit"}
                key={pic} 
                className="carousel_container_output">
                    <motion.div
                        // initial={"offscreen"}
                        // animate={"onscreen"}
                        // exit={"exit"}
                        // key={pic}
                        className="carousel_img_container"
                    >
                        <motion.img
                            variants={animation}
                            className="carousel_img"
                            src={pic}
                        />
                    </motion.div>
                    <motion.div
                    variants={animation} 
                    className="carousel_data_container">
                        <p>{data}</p>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Carousel;
