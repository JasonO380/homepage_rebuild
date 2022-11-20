import React from "react";
import logo from "../Images/logo.jpeg"

import "./nav.css";

const NavBar = () => {
    return(
        <div className="container">
            <div className="logo">
                <img className="nav_logo" src={logo} />
            </div>
            <div className="login_register_links">
                <a className="nav_link">LOGIN</a>
                <a className="nav_link">REGISTER</a>
            </div>
        </div>
    )
}

export default NavBar;