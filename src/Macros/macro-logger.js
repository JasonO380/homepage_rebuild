import React, { useEffect, useState, useContext } from "react";
import MacrosForm from "./macros-form";
import MacrosEditOutput from "./macros-edit-output";
import { LoginRegisterContext } from "../Authenticate/login-register-context";
import { motion } from "framer-motion";
import "./macro-logger.css";

let userID;
let editArray = [];

const MacroLogger = () => {
    const [macrosEnteredForDay, setMacrosForDayEntered] = useState(false);
    const auth = useContext(LoginRegisterContext);
    userID = auth.userID;
    console.log(userID);
    const [macros, setMacros] = useState([]);
    const [macrosToEdit, setMacrosToEdit] = useState([]);

    const addMacros = (newMacros) => {
        setMacros((prevMacros) => {
            return [...prevMacros, newMacros];
        });
    };

    const editMacros = (isCurrentDay) => {
        const date = new Date();
        const currentDay = date.getDate();
        const currentMonth = date.toLocaleString("en-US", { month: "long" });
        const currentYear = date.getFullYear();
        console.log(macrosEnteredForDay);
        console.log(isCurrentDay);
        console.log(
            isCurrentDay.map(
                (m) => m.day === currentDay && m.month === currentMonth
            )
        );
    };

    const fetchMacros = async () => {
        let editOptions = [];
        try {
            const response = await fetch(
                `https://barbell-factor.onrender.com/api/macros/macroslog/${userID}`
            );
            const responseData = await response.json();
            const macros = responseData.macros;
            const date = new Date();
            const currentDay = date.getDate();
            const currentMonth = date.toLocaleString("en-US", {
                month: "long",
            });
            const currentYear = date.getFullYear();
            console.log(macros.map((m) => m.day === currentDay));
            console.log(macros.map((m) => m.month === currentMonth));
            editOptions = macros.slice(-2);
            console.log(editOptions);
            editArray = editOptions.reverse();
            console.log(editArray);
            editMacros(editArray);
            macros.map((m) => {
                if (m.day === currentDay && m.month === currentMonth) {
                    setMacrosForDayEntered(true);
                    console.log(macrosEnteredForDay);
                }
            });
            setMacrosToEdit(editOptions);
            console.log(editArray);
        } catch (err) {}
    };

    useEffect(() => {
        fetchMacros();
    }, [userID]);

    if (macrosEnteredForDay) {
        return (
            <motion.div
                initial={{ x: -500 }}
                animate={{ x: 0 }}
                className="macros_edit_output_wrapper"
                exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
            >
                <MacrosEditOutput updateData={editArray} />
            </motion.div>
        );
    }

    return (
        <React.Fragment>
            <motion.div
                initial={{ x: -500 }}
                animate={{ x: 0 }}
                exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
            >
                <MacrosForm
                    fetch={fetchMacros}
                    // updateMode={isUpdateMode}
                    onUpdate={editMacros}
                    onAdd={addMacros}
                />
            </motion.div>
        </React.Fragment>
    );
}

export default MacroLogger;