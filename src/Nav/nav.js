import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Login from "../Authenticate/login";
import ReactDOM from "react-dom";
import logo from "../Images/logo.jpeg";
import { motion } from "framer-motion";

import "./nav.css";

const NavBar = () => {
    const [showLogin, setShowLogin] = useState(false);
    const loginClick = (event) => {
        event.preventDefault();
        setShowLogin(true);
    };
    const LoginModal = () => {
        return ReactDOM.createPortal(
            <Login />,
            document.getElementById("overlay")
        );
    };
    return (
        <React.Fragment>
            {showLogin && <LoginModal />}
            <div className="container">
                <div className="logo">
                    <img className="nav_logo" src={logo} />
                </div>
                <div className="login_register_links">
                    <NavLink className="nav_link" to="/login">
                        LOGIN
                    </NavLink>
                    <NavLink className="nav_link" to="/register">
                        REGISTER
                    </NavLink>
                </div>
            </div>
        </React.Fragment>
    );
};

export default NavBar;
