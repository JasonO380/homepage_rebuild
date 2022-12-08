import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LoginRegisterContext } from "../Authenticate/login-register-context";
import logo from "../Images/logo.jpeg";

import "./nav.css";

const NavBar = () => {
    const loginRegister = useContext(LoginRegisterContext);
    const isLoggedIn = loginRegister.isLoggedIn;

    return (
        <React.Fragment>
            {!isLoggedIn && (
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
            )}
            {isLoggedIn && (
                <div className="container">
                    <div className="logo">
                        <img className="nav_logo" src={logo} />
                    </div>
                    <div className="login_register_links">
                        <NavLink className="nav_link" to="/dashboard">
                            DASHBOARD
                        </NavLink>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default NavBar;
