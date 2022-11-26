import React, { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import "./authenticate.css";

const Register = () => {
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
        username:"",
        email: "",
        password: "",
    });
    // const loginRegister = useContext(LoginRegisterContext);

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

    const registerUser = (event) => {
        event.preventDefault()
        const inputName = event.target.name;
        const inputValue = event.target.value;
        console.log(inputName, inputValue, inputState);
    };

    return (
        <motion.div
        initial={{y: 500}}
        animate={{y: 0, transition: { type: "spring", bounce: 0.65, duration: .8 }}}
        exit={{x: window.innerWidth, transition: {duration: .35}}} 
        className="login_wrapper">
            <form onSubmit={registerUser}>
                <h1><FaUser icon="fa-duotone fa-user" /></h1>
                <label className="login_register_label">User Name</label>
                <input
                    className="login_register_input"
                    name="username"
                    value={inputState.username}
                    placeholder="enter email"
                    onChange={changeHandler}
                />
                <label className="login_register_label">Email</label>
                <input
                    className="login_register_input"
                    name="email"
                    value={inputState.email}
                    placeholder="enter email"
                    onChange={changeHandler}
                />
                <label className="login_register_label">Password</label>
                <input
                    className="login_register_input"
                    name="password"
                    value={inputState.password}
                    placeholder="enter password"
                    onChange={changeHandler}
                />
                <button
                className="login_register_button"
                onClick={registerUser}
                type="submit">REGISTER</button>
            </form>
        </motion.div>
    );
};

export default Register;
