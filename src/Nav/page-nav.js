import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LoginRegisterContext } from "../Authenticate/login-register-context";
import { form_nav_container, form_nav_link } from "../CSS/variables/form_style";

const PageNav = () => {
    const loginRegister = useContext(LoginRegisterContext);
    const isLoggedIn = loginRegister.isLoggedIn;

    if(!isLoggedIn){
        return (
            <div style={form_nav_container}>
                <NavLink style={form_nav_link} to="/">
                    HOME
                </NavLink>
            </div>
        )
    }

    return (
        <div style={form_nav_container}>
                <NavLink style={form_nav_link} to="/dashboard">
                    DASHBOARD
                </NavLink>
                <NavLink style={form_nav_link} to="/">
                    HOME
                </NavLink>
            </div>
    )
}

export default PageNav;