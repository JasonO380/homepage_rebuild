import React, { useState, useReducer, useContext, useEffect } from "react";
import PageNav from "../Nav/page-nav";
import LoadingSpinner from "../SharedComponents/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { LoginRegisterContext } from "./login-register-context";
import { formStyle } from "../CSS/variables/form_style";
import "./authenticate.css";

let accessGranted;
const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState()
    const inputReducer = (state, action) => {
        switch (action.type) {
            case "INPUT_CHANGE":
                return {
                    ...state,
                    [action.name]: action.value,
                };
            default:
                return state;
        }
    };
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState(true);
    const [login, setLogin] = useState(true);
    const [inputState, dispatch] = useReducer(inputReducer, {
        email: "",
        password: "",
    });
    const loginRegister = useContext(LoginRegisterContext);

    const changeHandler = (event) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;
        console.log(inputValue);
        console.log(inputName);
        dispatch({
            type: "INPUT_CHANGE",
            name: inputName,
            value: inputValue,
        });
    };

    const loginUser = async (event) => {
        if (!inputState.email || !inputState.password ) 
        {
            setIsValid(false);
            return null;
        }
        setIsLoading(true)
        event.preventDefault();
        const inputName = event.target.name;
        const inputValue = event.target.value;
        console.log(inputName, inputValue, inputState);
        try {
            const response = await fetch(
                "https://barbell-factor.onrender.com/api/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: inputState.email,
                        password: inputState.password,
                    }),
                }
            );
            const responseData = await response.json();
            accessGranted = responseData.message;
            console.log(responseData.message);
            console.log(accessGranted)
            loginRegister.login(responseData.userID, responseData.token);
        } catch (err) {
            console.log(err);
            setLogin(false)
            setErrorMessage(err.message)
        }
        if (accessGranted !== "Success") {
            setLogin(false);
            setIsLoading(false)
            console.log(login)
        } else {
            navigate("/dashboard");
            setIsLoading(false)
        }
    };

    return (
        <motion.div
            initial={{ y: 500 }}
            animate={{
                y: 0,
                transition: { type: "spring", bounce: 0.65, duration: 0.8 },
            }}
            exit={{ x: window.innerWidth, transition: { duration: 0.35 } }}
            className="login_register_wrapper"
        >
            <PageNav />
            {isLoading && <LoadingSpinner />}
            <form style={formStyle} onSubmit={loginUser}>
                <h1>
                    <FaUser icon="fa-duotone fa-user" />
                </h1>
                <label className="login_register_label">Email</label>
                <input
                    className="login_register_input"
                    name="email"
                    required
                    value={inputState.email}
                    placeholder="enter email"
                    onChange={changeHandler}
                />
                <label className="login_register_label">Password</label>
                <input
                    className="login_register_input"
                    name="password"
                    required
                    value={inputState.password}
                    placeholder="enter password"
                    onChange={changeHandler}
                />
                <button
                    className="login_register_button"
                    onClick={loginUser}
                    type="submit"
                >
                    LOGIN
                </button>
                {!isValid && (<p style={{color:"white"}}>Enter all fields</p>)}
            </form>
            {!login && (
                <motion.div
                initial={{y:-300}}
                style={{margin:'auto'}}
                animate={{y:0,transition: { type: "spring", bounce: 0.65, duration: 0.8 }}}>
                    <p style={{color:"white"}}>{accessGranted}</p>
                </motion.div>
                )}
        </motion.div>
    );
};

export default Login;
