import React from "react";
import monthSelectData from "./month-select-data";
import { NavLink } from "react-router-dom";
import { labelStyle } from "../CSS/variables/form_style";

import "./month-select.css";

const MonthSelect = (props) => {
    return (
        <div className="month_select_wrapper">
            <div className="select_container">
                <label className="select_label">Select Month</label>
                <select
                    className="select_field"
                    name={props.name}
                    isLoaded={props.isLoaded}
                    onChange={props.onChange}
                >
                    {monthSelectData.map((month) => {
                        return (
                            <option className="select_option">
                                {month.month}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="month_select_nav">
                <NavLink className="nav_link" to="/dashboard">
                    DASHBOARD
                </NavLink>
            </div>
        </div>
    );
};

export default MonthSelect;
