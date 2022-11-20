import React from "react";
import profile from "../Images/profile_pic.jpeg";
import logo from "../Images/logo.jpeg"


import "./nav.css";

const NavBar = () => {
    return(
        <div className="container">
            <div className="logo">
                <img className="nav_logo" src={logo} />
            </div>
            <div className="login_register_links">
                <a>LOGIN</a>
                <a>REGISTER</a>
            </div>
        </div>
    )
}

export default NavBar;