import React from "react";
import months from "./month-select-data";

const DropDownSelect = (props) => {
    return (
        <div className="select_container">
            <label className="select_label">Select Month</label>
            <select
                className="select_field"
                name={props.name}
                isLoaded={props.isLoaded}
                onChange={props.onChange}
            >
                {months.map((month) => {
                    return (
                        <option className="select_option">{month.month}</option>
                    );
                })}
            </select>
        </div>
    );
};

export default DropDownSelect;