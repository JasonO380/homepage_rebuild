import React, { useState, useReducer, useContext } from "react";
import { LoginRegisterContext } from "../Authenticate/login-register-context";
import { useNavigate } from "react-router-dom";
import { centerDiv } from "../CSS/variables/global-div-styles";
import MacrosEdit from "./macros-edit";
import LoadingSpinner from "../SharedComponents/LoadingSpinner";
import DonutChart from "../SharedComponents/donut-chart";
import { labelStyle, inputStyle } from "../CSS/variables/form_style";
import { updateFormStyle } from "../CSS/variables/form_style";
import buttonStyle from "../CSS/variables/button_style";
import { motion } from "framer-motion";
import "./macros-edit-output.css";

let mid;
const MacrosEditOutput = (props) => {
    const auth = useContext(LoginRegisterContext);
    const [isLoading, setIsLoading] = useState(false)
    const inputReducer = (state, action) => {
        const dateEntry = new Date();
        switch (action.type) {
            case "INPUT_CHANGE":
                return {
                    ...state,
                    [action.name]: action.value,
                    id: mid,
                    athlete: auth.userID,
                    year: dateEntry.getFullYear(),
                    dayOfWeek: dateEntry.toLocaleString("default", {
                        weekday: "long",
                    }),
                    month: dateEntry.toLocaleString("en-US", { month: "long" }),
                    day: dateEntry.getDate(),
                };
            case "CLEAR_FORM":
                return {
                    carbs: "",
                    protein: "",
                    fats: "",
                };
            default:
                return state;
        }
    };
    const navigate = useNavigate();
    const [updateComplete, setUpdateComplete] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);
    const [inputState, dispatch] = useReducer(inputReducer, {
        carbs: "",
        protein: "",
        fats: "",
        athlete: auth.userID,
    });

    const changeHandler = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        console.log(mid)
        mid = event.target.id;
        dispatch({
            type: "INPUT_CHANGE",
            name: name,
            value: value,
        });
    };

    const postUpdateMacroData = async (event) => {
        event.preventDefault();
        if (
            inputState.carbs.length === 0 ||
            inputState.protein.length === 0 ||
            inputState.fats.length === 0
        ) {
            setIsValid(false);
            setFormIsValid(false);
            return null;
        }
        setIsLoading(true)
        setFormIsValid(true);
        try {
            const response = await fetch(
                `https://barbell-factor.onrender.com/api/macros/${mid}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                    body: JSON.stringify({
                        carbs: inputState.carbs,
                        fats: inputState.fats,
                        protein: inputState.protein,
                    }),
                }
            );
            const responseData = await response.json();
            console.log(responseData);
        } catch (err) {}
        setUpdateComplete(true);
        setIsLoading(false)
    };

    if (updateComplete) {
        return <MacrosEdit />;
    }

    return (
        <React.Fragment>
        {isLoading && (
            <div className="spinner">
                <LoadingSpinner />
            </div>
        )}
            {props.updateData.map((macros) => {
                return (
                    <motion.div
                        className="update_container"
                        initial={{ x: -500 }}
                        animate={{ x: 0 }}
                        exit={{
                            x: window.innerWidth,
                            transition: { duration: 0.2 },
                        }}
                    >
                        <DonutChart items2={macros} />
                        <form style={updateFormStyle}>
                            
                                <label style={labelStyle}>Carbs</label>
                                <input
                                    style={inputStyle}
                                    required
                                    id={macros.id}
                                    element="input"
                                    type="text"
                                    name="carbs"
                                    label="Carbs"
                                    errorText="Please enter your carb intake in grams"
                                    placeholder={macros.carbs}
                                    onChange={changeHandler}
                                />
                            
                                <label style={labelStyle}>Protein</label>
                                <input
                                    style={inputStyle}
                                    required
                                    id={macros.id}
                                    element="input"
                                    type="text"
                                    name="protein"
                                    label="Protein"
                                    errorText="Please enter your protein intake in grams"
                                    placeholder={macros.protein}
                                    onChange={changeHandler}
                                />
                            
                                <label style={labelStyle}>Fats</label>
                                <input
                                    style={inputStyle}
                                    required
                                    id={macros.id}
                                    element="input"
                                    type="text"
                                    name="fats"
                                    label="Fats"
                                    errorText="Please enter your fat intake in grams"
                                    placeholder={macros.fats}
                                    onChange={changeHandler}
                                />
                            
                                <motion.button
                                    style={buttonStyle}
                                    whileTap={{ scale: 0.8 }}
                                    onClick={postUpdateMacroData}
                                >
                                    Update
                                </motion.button>
                                {!isValid ? (
                            <div
                                style={{ display: formIsValid && "none" }}
                                className="error_message"
                            >
                                <p className="form_error_message">
                                    Please enter all fields
                                </p>
                            </div>
                        ) : null}
                        </form>
                    </motion.div>
                );
            })}
        </React.Fragment>
    );
};

export default MacrosEditOutput;
