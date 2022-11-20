import React from "react";
import ContactInfo from "./contact_info";
import NavBar from "../Nav/nav";
import IntroSection from "./introsection";
import LogoProfilePic from "./logo_profile_pic";
import AboutMe from "./aboutme";
import FitnessTrackerPreview from "./fitness_tracker_preview";

const HomePage = () => {
    return (
        <React.Fragment>
            <nav>
                <NavBar />
            </nav>
            <ContactInfo />
            <IntroSection />
            <LogoProfilePic />
            <AboutMe />
            <FitnessTrackerPreview />
        </React.Fragment>
    );
};

export default HomePage;
