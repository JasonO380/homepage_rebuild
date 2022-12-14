import React, { useState } from "react";
import introSectionData from "./introsection_data";
import Carousel from "../SharedComponents/carousel";
import bumpers from "../Images/bumpers_wallballs.jpeg";
import me from "../Images/snatch_drop.jpeg";
import KBandDB from "../Images/db_and_kb.jpeg";
import jerkBlocks from "../Images/jerk_blocks.jpeg";
import mary from "../Images/Mary_lift.jpeg";
import { italics } from "../CSS/variables/fonts";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import "./introsection.css";

const IntroSection = () => {
    let colorOptions = ["red", "blue", "green", "yellow", "purple"];
    let picOptions = [bumpers, mary, KBandDB, jerkBlocks, me]
    let direction;
    const introArray = introSectionData.map(data => data);
    const array = (introArray.map(data => data));
    console.log(array.length)
    const [count, setCount] = useState(0);
    const [carouselCount, setCarouselCount] = useState()
    let newSlide = array[count];
    let newPic = picOptions[count];
    let color = colorOptions[count]
    const nextSlide = (event) => {
        direction = event.target.name;
        if (direction === "plus") {
            setCount((c) => c + 1);
            console.log(count)
            setCarouselCount(direction)
            if (count > array.length - 2){
                setCount(0)
                console.log(count)
            }
        }
        if (direction === "minus") {
            setCount((c) => c - 1);
            console.log(count)
            setCarouselCount(direction)
            if (count < 1){
                setCount(array.length-1)
            }
        } 
    }; 
    return (
        <React.Fragment>
            <div>
                <h3 style={italics} >GET LEAN, STRONG AND MOBILE</h3>
            </div>
            <div>
                <div className="carousel_container">
                    <div className="carousel_button_container">
                        <motion.button 
                        onClick={nextSlide}
                        whileTap={{ scale: 0.8 }}
                        className="chevron_style" 
                        name="minus">
                        <i className="carousel_button" onClick={nextSlide}><FaChevronLeft size={22} /></i>
                        </motion.button>
                    </div>
                    <Carousel direction={carouselCount} info={newSlide} color={color} pic={newPic} />
                    <div className="carousel_button_container">
                        <motion.button 
                        onClick={nextSlide} 
                        name="plus"
                        whileTap={{ scale: 0.8 }} 
                        className="chevron_style">
                        <i className="carousel_button" onClick={nextSlide}><FaChevronRight size={22} /></i>
                        </motion.button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default IntroSection;

//Going to add lifting videos here eventually ?????????????????//
