import React, { useState, useContext } from "react";
import MonthSelect from "../SharedComponents/month-select";
import DonutChart from "../SharedComponents/donut-chart";
import NavBar from "../Nav/nav";
import { LoginRegisterContext } from "../Authenticate/login-register-context";
import { centerDiv, wrapper } from "../CSS/variables/global-div-styles";
import { motion } from "framer-motion";

import "./macro-viewer.css";

let month;
const MacroViewer = (props) => {
    const auth = useContext(LoginRegisterContext);
    let userID;
    let foundMonth = [];
    let macroData;
    const [isSelectedMonthLoaded, setIsSelectedMonthLoaded] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState();
    const [macroMonth, setMacroMonth] = useState();

    const handleSelect = (event) => {
        console.log("here");
        const choice = event.target.value;
        month = event.target.value;
        setSelectedMonth(choice);
        console.log(selectedMonth);
        fetchMacros();
    };

    const fetchMacros = async () => {
        userID = auth.userID;
        try {
            const response = await fetch(
                `https://barbell-factor.onrender.com/api/macros/macroslog/${userID}`
            );
            const responseData = await response.json();
            const macros = responseData.macros;
            macroData = macros.reverse();
            setMacroMonth(macroData);
            getMonths();
        } catch (err) {}
    };

    const getMonths = () => {
        console.log("here in getMonths");
        macroData.map((macros) => {
            console.log(macros);
            if (month === macros.month) {
                setIsSelectedMonthLoaded(true);
                foundMonth.push(macros);
                foundMonth = macros;
                console.log(foundMonth);
            }
            if (foundMonth.length === 0) {
                console.log(foundMonth.length);
                setIsSelectedMonthLoaded(false);
                console.log(isSelectedMonthLoaded);
            }
        });
    };

    if (!selectedMonth && !isSelectedMonthLoaded) {
        return (
            <div className="macro_viewer_wrapper">
                <MonthSelect
                    name={selectedMonth}
                    onChange={handleSelect}
                    isLoaded={setIsSelectedMonthLoaded}
                />
                <motion.div
                    style={centerDiv}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    exit={{
                        x: window.innerWidth,
                        transition: { duration: 0.2 },
                    }}
                >
                    <h2>Please select a month to view macro for that month</h2>
                </motion.div>
            </div>
        );
    }

    if (!isSelectedMonthLoaded && selectedMonth) {
        return (
            <div className="macro_viewer_wrapper">
                <MonthSelect
                    name={selectedMonth}
                    onChange={handleSelect}
                    isLoaded={setIsSelectedMonthLoaded}
                />
                <motion.div
                    style={centerDiv}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    exit={{
                        x: window.innerWidth,
                        transition: { duration: 0.2 },
                    }}
                >
                    <motion.h2
                    initial={{ scale: 0 }}
                    animate={{ 
                        scale: 1, 
                        transition: { type: "spring", bounce: 0.65, duration: 1.8 } 
                        }}
                    exit={{scale:0}}
                    >No data yet for the selected month</motion.h2>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="macro_viewer_wrapper">
            <MonthSelect
                name={selectedMonth}
                onChange={handleSelect}
                isLoaded={setIsSelectedMonthLoaded}
            />
            <motion.div
                className="doughnut_container"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale:0, transition: { duration: 2.9 } }}
            >
                {macroMonth.map((macros) => {
                    if (month === macros.month) {
                        return <DonutChart items2={macros} />;
                    }
                })}
            </motion.div>
        </div>
    );
};

export default MacroViewer;
