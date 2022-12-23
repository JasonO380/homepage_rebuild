import React, { useState, useReducer, useContext } from "react";
import PageNav from "../Nav/page-nav";
import LoadingSpinner from "../SharedComponents/LoadingSpinner";
import buttonStyle from "../CSS/variables/button_style";
import { 
    formStyle, 
    formWrapper, 
    labelStyle, 
    inputStyle,
    } from "../CSS/variables/form_style";
import { LoginRegisterContext } from "../Authenticate/login-register-context";
import { FaUtensils } from "react-icons/fa";
import { motion } from "framer-motion";

const MacrosForm = (props)=> {
    const auth = useContext(LoginRegisterContext);
    const [isLoading, setIsLoading] = useState(false)
    const inputReducer = (state, action) => {
        const dateEntry = new Date();
        switch (action.type) {
            case "INPUT_CHANGE":
                return {
                    ...state,
                    [action.name]: action.value,
                    // athlete: id,
                    year: dateEntry.getFullYear(),
                    dayOfWeek: dateEntry.toLocaleString("default", {
                        weekday: "long",
                    }),
                    month: dateEntry.toLocaleString("en-US", { month: "long" }),
                    day: dateEntry.getDate(),
                };
            case "CLEAR_FORM":
                return {
                    protein: "",
                    carbs: "",
                    fats: ""
                };
            default:
                return state;
        }
    };
    const [isValid, setIsValid] = useState(true);
    const [inputState, dispatch] = useReducer(inputReducer, {});

    const changeHandler = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        console.log(inputName, inputValue)
        dispatch({
            type: "INPUT_CHANGE",
            name: inputName,
            value: inputValue,
        });
    };

    const postMacros = async (event) =>{
        event.preventDefault()
        console.log(inputState)
        if (
            !inputState.protein ||
            !inputState.carbs ||
            !inputState.fats 
        ) {
            setIsValid(false);
            return null;
        } else {
            console.log(inputState);
            props.onAdd(inputState);
        }
        setIsLoading(true)
        try {
            const response = await fetch(
                "https://barbell-factor.onrender.com/api/macros",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                    body: JSON.stringify({
                        carbs: inputState.carbs,
                        protein: inputState.protein,
                        fats: inputState.fats,
                        year: inputState.year,
                        month: inputState.month,
                        day: inputState.day,
                        athlete: auth.userID,
                    }),
                }
            );
            const responseData = await response.json();
            console.log(responseData.message);
            console.log(inputState);
            props.fetch();
        } catch (err) {}
        setIsLoading(false)
        dispatch({
            type: "CLEAR_FORM",
        });
        event.preventDefault();
    }

    return(
        <motion.div
        initial={{y: -500}}
        animate={{y: 0, transition: { type: "spring", bounce: 0.65, duration: .8 }}}
        exit={{x: window.innerWidth, transition: {duration: .35}}}  
        style={formWrapper}>
            <PageNav />
            {isLoading && <LoadingSpinner />}
            <form style={formStyle}>
            <h1><FaUtensils icon="fa-duotone fa-user" /></h1>
                <label style={labelStyle}>Protein</label>
                <input
                    style={inputStyle}
                    name="protein"
                    value={inputState.protein}
                    placeholder="enter protein in grams"
                    onChange={changeHandler}
                />
                <label style={labelStyle}>Carbs</label>
                <input
                    style={inputStyle}
                    name="carbs"
                    value={inputState.carbs}
                    placeholder="enter carbs in grams"
                    onChange={changeHandler}
                />
                <label style={labelStyle}>Fats</label>
                <input
                    style={inputStyle}
                    name="fats"
                    value={inputState.fats}
                    placeholder="enter password"
                    onChange={changeHandler}
                />
                <button
                style={buttonStyle}
                onClick={postMacros}
                type="submit">POST</button>
                {!isValid && (
                <p>Please enter all fields</p>
            )}
            </form>
        </motion.div>

    )
}

export default MacrosForm;