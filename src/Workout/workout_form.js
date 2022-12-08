import React, { useState, useReducer, UseContext } from "react";
import FormNav from "../Nav/form-nav";
import Footer from "../Footer/footer";
import buttonStyle from "../CSS/variables/button_style";
import {
    formStyle,
    formWrapper,
    labelStyle,
    inputStyle,
} from "../CSS/variables/form_style";
import { FaDumbbell } from "react-icons/fa";
import { motion } from "framer-motion";
const WorkoutForm = () => {
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
                    movement: "",
                    reps: "",
                    rounds: "",
                    weight: "",
                };
            default:
                return state;
        }
    };
    // const auth = useContext(LoginRegisterContext);
    const [formIsValid, setFormIsValid] = useState(true);
    const [isValid, setIsValid] = useState(true);
    // const navigate = useNavigate();
    const [inputState, dispatch] = useReducer(inputReducer, {});

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

    const postWorkout = (event) => {
        event.preventDefault();
        console.log(inputState);
        if (
            !inputState.movement ||
            !inputState.rounds ||
            !inputState.reps ||
            !inputState.reps
        ) {
            setIsValid(false);
            return null;
        }
        dispatch({
            type: "CLEAR_FORM",
        });
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
                <FormNav />
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
                        name="Rounds"
                        value={inputState.rounds}
                        placeholder="enter password"
                        onChange={changeHandler}
                    />
                    <label style={labelStyle}>Reps</label>
                    <input
                        style={inputStyle}
                        name="Reps"
                        value={inputState.reps}
                        placeholder="enter password"
                        onChange={changeHandler}
                    />
                    <label style={labelStyle}>Weight</label>
                    <input
                        style={inputStyle}
                        name="Weight"
                        value={inputState.weight}
                        placeholder="enter weight used"
                        onChange={changeHandler}
                    />
                    <button
                        style={buttonStyle}
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
            <Footer />
        </React.Fragment>
    );
};

export default WorkoutForm;
