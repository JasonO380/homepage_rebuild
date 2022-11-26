import React from "react";
import ContactInfo from "./contact_info";
import NavBar from "../Nav/nav";
import IntroSection from "./introsection";
import LogoProfilePic from "./logo_profile_pic";
import AboutMe from "./aboutme";
import Services from "./services";
import FitnessTrackerPreview from "./fitness_tracker_preview";
import { motion } from "framer-motion";

const HomePage = () => {
    return (
        <React.Fragment>
            <motion.div
            initial={{x: -500}}
            animate={{x: 0, transition: { type: "spring", bounce: 0.65, duration: 1.2 }}}
            exit={{x: window.innerWidth, transition: {duration: .35}}}>
                <nav>
                    <NavBar />
                </nav>
                <ContactInfo />
                <IntroSection />
                <LogoProfilePic />
                <AboutMe />
                <FitnessTrackerPreview />
                <Services />
            </motion.div>
        </React.Fragment>
    );
};

export default HomePage;
