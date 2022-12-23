import React, { useState, useContext, useReducer } from "react";
import { LoginRegisterContext } from "../Authenticate/login-register-context";
import { formWrapper, formStyle, inputStyle, labelStyle } from "../CSS/variables/form_style";
import { motion } from "framer-motion";
import PageNav from "../Nav/page-nav";
import buttonStyle from "../CSS/variables/button_style";
import LoadingSpinner from "../SharedComponents/LoadingSpinner";
import { FaDumbbell } from "react-icons/fa";


const WorkoutForm = (props) => {
    let id;
    const [isLoading, setIsLoading] = useState(false)
    const inputReducer = (state, action) => {
        const dateEntry = new Date();
        switch (action.type) {
            case "INPUT_CHANGE":
                return {
                    ...state,
                    [action.name]: action.value,
                    athlete: id,
                    year: dateEntry.getFullYear(),
                    dayOfWeek: dateEntry.toLocaleString("default", {
                        weekday: "long",
                    }),
                    month: dateEntry.toLocaleString("en-US", { month: "long" }),
                    day: dateEntry.getDate(),
                };
            case "CLEAR_FORM":
                return {
                    movement: "",
                    reps: "",
                    rounds: "",
                    weight: "",
                };
            default:
                return state;
        }
    };
    const auth = useContext(LoginRegisterContext);
    const [formIsValid, setFormIsValid] = useState(true);
    const [isValid, setIsValid] = useState(true);
    const [inputState, dispatch] = useReducer(inputReducer, {
        movement: "",
        reps: "",
        rounds: "",
        weight: "",
        athlete: auth.userID,
    });
    id = auth.userID;

    const changeHandler = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        console.log(inputName, inputValue);
        dispatch({
            type: "INPUT_CHANGE",
            name: inputName,
            value: inputValue,
        });
    };

    const postWorkout = async (event) => {
        id = auth.userID;
        event.preventDefault();
        console.log(inputState);
        console.log(id)
        if (
            !inputState.movement ||
            !inputState.rounds ||
            !inputState.reps 
        ) {
            setIsValid(false);
            return null;
        }
        setIsLoading(true);
        try {
            const response = await fetch(
                "https://barbell-factor.onrender.com/api/workouts",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                    body: JSON.stringify({
                        movement: inputState.movement,
                        rounds: inputState.rounds,
                        reps: inputState.reps,
                        weight: inputState.weight,
                        dayOfWeek: inputState.dayOfWeek,
                        month: inputState.month,
                        day: inputState.day,
                        year: inputState.year,
                        athlete: id,
                    }),
                }
            );
            const responseData = await response.json();
            console.log(responseData.session);
            props.workoutFormItems(responseData.session);
        } catch (err) {}
        dispatch({
            type: "CLEAR_FORM",
        });
        setFormIsValid(true);
        event.preventDefault();
        setIsLoading(false)
    };

    return (
        <React.Fragment>
            <motion.div
                initial={{ y: -500 }}
                animate={{
                    y: 0,
                    transition: { type: "spring", bounce: 0.65, duration: 0.8 },
                }}
                exit={{ x: window.innerWidth, transition: { duration: 0.35 } }}
                style={formWrapper}
            >
                <PageNav />
                {isLoading && <LoadingSpinner />}
                <form style={formStyle}>
                    <h1>
                        <FaDumbbell icon="fa-duotone fa-user" />
                    </h1>
                    <label style={labelStyle}>Movement</label>
                    <input
                        style={inputStyle}
                        name="movement"
                        value={inputState.movement}
                        placeholder="enter movement"
                        onChange={changeHandler}
                    />
                    <label style={labelStyle}>Rounds</label>
                    <input
                        style={inputStyle}
                        name="rounds"
                        value={inputState.rounds}
                        placeholder="enter rounds"
                        onChange={changeHandler}
                    />
                    <label style={labelStyle}>Reps</label>
                    <input
                        style={inputStyle}
                        name="reps"
                        value={inputState.reps}
                        placeholder="enter reps"
                        onChange={changeHandler}
                    />
                    <label style={labelStyle}>Weight</label>
                    <input
                        style={inputStyle}
                        name="weight"
                        value={inputState.weight}
                        placeholder="enter weight used"
                        onChange={changeHandler}
                    />
                    <button
                        style={buttonStyle}
                        value={inputState.id}
                        onClick={postWorkout}
                        type="submit"
                    >
                        POST
                    </button>
                    {!isValid && (
                        <div>
                            <p>Please enter all fields</p>
                        </div>
                    )}
                </form>
            </motion.div>
            
        </React.Fragment>
    )
}

export default WorkoutForm;
