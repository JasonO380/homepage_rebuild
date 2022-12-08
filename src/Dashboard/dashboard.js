import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../Images/logo.jpeg";
import { motion } from "framer-motion";
import { wrapper, centerDiv } from "../CSS/variables/global-div-styles";
import buttonStyle from "../CSS/variables/button_style";
import Footer from "../Footer/footer";
import "./dashboard.css";

const Dashboard = () => {
    return (
        <React.Fragment>
            <motion.div
                style={wrapper}
                initial={{ x: -500 }}
                animate={{
                    x: 0,
                    transition: { type: "spring", bounce: 0.65, duration: 1.2 },
                }}
                exit={{ x: window.innerWidth, transition: { duration: 0.35 } }}
            >
            <div className="dashboard_wrapper">
                <div className="dashboard_logo_container">
                    <img className="dashboard_logo_img" src={logo} />
                </div>
                <div className="dashboard_button_wrapper">
                    <div className="dashboard_button_container">
                        <NavLink to="/" className="dashboard_button">Home</NavLink>
                    </div>
                    <div className="dashboard_button_container">
                        <NavLink to="/macroslogger" className="dashboard_button">MacrosLog</NavLink>
                    </div>
                    <div className="dashboard_button_container">
                        <NavLink to="/macrosview" className="dashboard_button">MacrosView</NavLink>
                    </div>
                    <div className="dashboard_button_container">
                        <NavLink to="/workoutlog" className="dashboard_button">WorkoutLog</NavLink>
                    </div>
                    <div className="dashboard_button_container">
                        <NavLink to="/workoutview" className="dashboard_button">WorkoutView</NavLink>
                    </div>
                </div>
            </div>
            </motion.div>
            <Footer />
        </React.Fragment>
    );
};

export default Dashboard;
