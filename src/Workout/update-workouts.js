import React, {
    useState,
    useEffect,
    useReducer,
    useContext,
    useRef,
} from "react";
import { motion } from "framer-motion";
import { updateFormStyle } from "../CSS/variables/form_style";
import { LoginRegisterContext } from "../Authenticate/login-register-context";
import buttonStyle from "../CSS/variables/button_style";
import { formStyle, labelStyle, inputStyle } from "../CSS/variables/form_style";
import LoadingSpinner from "../SharedComponents/LoadingSpinner";

const UpdateWorkouts = (props) => {
    const [isLoading, setIsLoading] = useState(false)
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
    let update = props.updateItems;
    if (update.length < 1) {
        props.allWorkoutsDeleted(true);
    }
    const wid = update.id;
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
        const updateDiv = refPoint.current;
        if (updateDiv && updateDiv.contains(event.target)) {
            setShowModal(true);
        } else {
            props.isUpdateMode(false);
            setShowModal(false);
            document.removeEventListener("click", handleClickOutsideDiv);
        }
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
            !inputState.weight
        ) {
            setIsValid(false);
            setFormIsValid(false);
            return null;
        } else {
            props.isUpdateMode(false);
            props.showUpdate(true);
        }
        setIsLoading(true)
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
        } catch (err) {}
        props.isUpdateMode(false);
        setIsLoading(false)
        props.fetch();
    };

    const deleteWorkout = async (event) => {
        event.preventDefault();
        setIsLoading(true)
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
        setIsLoading(false)
        props.isUpdateMode(false);
        props.fetch();
    };

    return (
        <div 
        style={{
            display: !showModal && "none"}}>
            {isLoading && <LoadingSpinner />}
            <form
            ref={refPoint} 
            style={updateFormStyle}>
                <h3>
                    EDIT
                </h3>
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
                    name="rounds"
                    label="rounds"
                    placeholder={update.rounds}
                    onChange={handleChange}
                />
                <label style={labelStyle}>Reps</label>
                <input
                    style={inputStyle}
                    name="reps"
                    label="reps"
                    placeholder={update.reps}
                    onChange={handleChange}
                />
                <label style={labelStyle}>Weight</label>
                <input
                    style={inputStyle}
                    name="weight"
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
