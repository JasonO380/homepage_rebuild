import React, { useState, useReducer, useContext } from "react";
import PageNav from "../Nav/page-nav";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { LoginRegisterContext } from "./login-register-context";
import { formStyle } from "../CSS/variables/form_style";
import LoadingSpinner from "../SharedComponents/LoadingSpinner";
import "./authenticate.css";

let accessGranted;
const Register = () => {
    const [isLoading, setIsloading] = useState(false);
    const [isValid, setIsValid] = useState(true)
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
    const [login, setLogin] = useState(true);
    const [inputState, dispatch] = useReducer(inputReducer, {
        username: "",
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

    const registerUser = async (event) => {
        if (
            !inputState.username ||
            !inputState.email ||
            !inputState.password 
        ) {
            setIsValid(false);
            return null;
        }
        setIsloading(true)
        event.preventDefault();
        const inputName = event.target.name;
        const inputValue = event.target.value;
        console.log(inputName, inputValue, inputState);
        try {
            const response = await fetch(
                "https://barbell-factor.onrender.com/api/users//signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: inputState.username,
                        email: inputState.email,
                        password: inputState.password,
                    }),
                }
            );
            const responseData = await response.json();
            console.log(responseData);
            accessGranted = responseData;
            if(accessGranted !== "Success"){
                console.log(accessGranted)
                setLogin(false)
            } else {
                loginRegister.login(responseData.userID, responseData.token);
                navigate("/dashboard");
            }
            // loginRegister.login(responseData.userID, responseData.token);
            // navigate("/dashboard");
        } catch (err) {
            console.log(err);
        }
        setIsloading(false)
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
            <form
            style={formStyle} 
            onSubmit={registerUser}>
                <h1>
                    <FaUser icon="fa-duotone fa-user" />
                </h1>
                <label className="login_register_label">User Name</label>
                <input
                    className="login_register_input"
                    name="username"
                    required
                    value={inputState.username}
                    placeholder="enter username"
                    onChange={changeHandler}
                />
                <label className="login_register_label">Email</label>
                <input
                    className="login_register_input"
                    name="email"
                    required
                    value={inputState.email}
                    placeholder="email must contain @"
                    onChange={changeHandler}
                />
                <label className="login_register_label">Password</label>
                <input
                    className="login_register_input"
                    name="password"
                    required
                    value={inputState.password}
                    placeholder="minimum 6 characters"
                    onChange={changeHandler}
                />
                <button
                    className="login_register_button"
                    onClick={registerUser}
                    type="submit"
                >
                    REGISTER
                </button>
                {!isValid && (<p style={{color:"white"}}>Enter all fields</p>)}
            </form>
            {!login && (
                <motion.div
                initial={{y:-300}}
                style={{margin:'auto'}}
                animate={{y:0,transition: { type: "spring", bounce: 0.65, duration: 0.8 }}}>
                    <p style={{color:"white"}}>{accessGranted.message}</p>
                </motion.div>
                )}
        </motion.div>
    );
};

export default Register;
