import React from "react";
import { NavLink } from "react-router-dom";
import { form_nav_container, form_nav_link } from "../CSS/variables/form_style";

const FormNav = () => {
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

export default FormNav;