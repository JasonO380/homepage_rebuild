import React, {
    useState,
    useEffect,
    useReducer,
    useContext,
    useRef,
} from "react";
import { motion } from "framer-motion";
import { LoginRegisterContext } from "../Authenticate/login-register-context";
import buttonStyle from "../CSS/variables/button_style";
import { formStyle, labelStyle, inputStyle } from "../CSS/variables/form_style";
import { FaDumbbell } from "react-icons/fa";

const UpdateWorkouts = (props) => {
    const inputReducer = (state, action) => {
        const dateEntry = new Date();
        switch (action.type) {
            case "INPUT_CHANGE":
                return {
                    ...state,
                    [action.name]: action.value,
                    athlete: "",
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
    const [formIsValid, setFormIsValid] = useState(true);
    const [showModal, setShowModal] = useState(true);
    const [isValid, setIsValid] = useState(true);
    const auth = useContext(LoginRegisterContext);
    console.log(props.updateItems);
    let update = props.updateItems;
    console.log(update);
    console.log(update.movement);
    if (update.length < 1) {
        props.allWorkoutsDeleted(true);
    }
    const wid = update.id;
    console.log(wid)
    const refPoint = useRef(null);
    const [inputState, dispatch] = useReducer(inputReducer, {
        movement: "",
        reps: "",
        rounds: "",
        weight: "",
    });

    useEffect(() => {
        document.addEventListener("click", handleClickOutsideDiv);
    }, [wid]);

    const handleClickOutsideDiv = (event) => {
        console.log(event.target);
        console.log(refPoint);
        const updateDiv = refPoint.current;
        console.log(updateDiv);
        if (updateDiv && updateDiv.contains(event.target)) {
            setShowModal(true);
            console.log("Clicked inside");
        } else {
            console.log("clicked outside");
            props.isUpdateMode(false);
            setShowModal(false);
        }
        return () => {
            document.removeEventListener("click", handleClickOutsideDiv);
        };
    };

    const handleChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        dispatch({
            type: "INPUT_CHANGE",
            name: inputName,
            value: inputValue,
        });
    };

    const postUpdate = async (event) => {
        event.preventDefault();
        if (
            !inputState.movement ||
            !inputState.reps ||
            !inputState.rounds ||
            !inputState.movement
        ) {
            setIsValid(false);
            setFormIsValid(false);
            return null;
        } else {
            props.isUpdateMode(false);
            props.showUpdate(true);
        }
        try {
            const response = await fetch(
                `https://barbell-factor.onrender.com/api/workouts/${wid}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                    body: JSON.stringify({
                        movement: inputState.movement,
                        rounds: inputState.rounds,
                        reps: inputState.reps,
                        weight: inputState.weight,
                    }),
                }
            );
            const responseData = await response.json();
            console.log(responseData);
        } catch (err) {}
        props.isUpdateMode(false);
        props.fetch();
    };

    const deleteWorkout = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `https://barbell-factor.onrender.com/api/workouts/${wid}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: "Issuer " + auth.token,
                    },
                }
            );
        } catch (err) {}
        props.isUpdateMode(false);
        props.fetch();
    };

    return (
        <div>
            <form
            ref={refPoint} 
            style={formStyle}>
                <h1>
                    <FaDumbbell icon="fa-duotone fa-user" />
                </h1>
                <label style={labelStyle}>Movement</label>
                <input
                    style={inputStyle}
                    name="movement"
                    placeholder={update.movement}
                    label="movement"
                    onChange={handleChange}
                />
                <label style={labelStyle}>Rounds</label>
                <input
                    style={inputStyle}
                    name="Rounds"
                    label="rounds"
                    placeholder={update.rounds}
                    onChange={handleChange}
                />
                <label style={labelStyle}>Reps</label>
                <input
                    style={inputStyle}
                    name="Reps"
                    label="reps"
                    placeholder={update.reps}
                    onChange={handleChange}
                />
                <label style={labelStyle}>Weight</label>
                <input
                    style={inputStyle}
                    name="Weight"
                    label="weight"
                    placeholder={update.weight}
                    onChange={handleChange}
                />
                <button style={buttonStyle} onClick={postUpdate} type="submit">
                    EDIT
                </button>
                <button
                    style={buttonStyle}
                    onClick={deleteWorkout}
                    type="submit"
                >
                    DELETE
                </button>
                {!isValid && (
                    <div>
                        <p>Please enter all fields</p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default UpdateWorkouts;
