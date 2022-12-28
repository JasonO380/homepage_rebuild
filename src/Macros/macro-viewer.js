import React, { useState, useContext, useEffect } from "react";
import MonthSelect from "../SharedComponents/month-select";
import DonutChart from "../SharedComponents/donut-chart";
import LoadingSpinner from "../SharedComponents/LoadingSpinner";
import NavBar from "../Nav/nav";
import { LoginRegisterContext } from "../Authenticate/login-register-context";
import { centerDiv, wrapper } from "../CSS/variables/global-div-styles";
import { motion } from "framer-motion";

import "./macro-viewer.css";

let choice;
let userID;
let foundMonth = [];
const MacroViewer = (props) => {
    const auth = useContext(LoginRegisterContext);
    // let macroData;
    const [isLoading, setIsLoading] = useState(false)
    const [selectedMonth, setSelectedMonth] = useState()
    const [isSelectedMonthLoaded, setIsSelectedMonthLoaded] = useState(false);
    
    const handleSelect = (event) => {
        choice = event.target.value;
        setSelectedMonth(choice);
        fetchMacros();
    };

    const fetchMacros = async () => {
        let macroData;
        setIsLoading(true)
        userID = auth.userID;
        try {
            const response = await fetch(
                `https://barbell-factor.onrender.com/api/macros/macroslog/${userID}`
            );
            const responseData = await response.json();
            const macros = responseData.macros;
            macroData = macros.reverse();
            getMonths(macros);
        } catch (err) {}
        setIsLoading(false)
    };

    useEffect(()=>{
        setIsSelectedMonthLoaded(true)
        setSelectedMonth(choice)
    },[choice])

    useEffect(()=>{
        fetchMacros()
    },[])

    const getMonths = (macroData) => {
        console.log(macroData)
        let chosenMonth;
        const date = new Date();
        const currentMonth = date.toLocaleDateString("en-US", {
            month: "long",
        });
        let monthMacros = new Set();
        if(!isSelectedMonthLoaded){
            chosenMonth = currentMonth;
        } else {
            chosenMonth = choice;
        }
        console.log(chosenMonth)
        macroData.map((m) => {
            if (chosenMonth === m.month) {
                monthMacros.add(m)
            }
        });
        foundMonth = [...monthMacros]
    };

    if (foundMonth.length === 0) {
        return (
            <div className="macro_viewer_wrapper">
                <MonthSelect
                    name={selectedMonth}
                    onChange={handleSelect}
                    isLoaded={setIsSelectedMonthLoaded}
                />
                {isLoading && <LoadingSpinner />}
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
            {isLoading && <LoadingSpinner />}
            <motion.div
                className="doughnut_container"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={foundMonth}
                exit={{ scale:0, transition: { duration: 2.9 } }}
            >
                {foundMonth.map((macros) => {
                    return <DonutChart items2={macros} />;
                })}
            </motion.div>
        </div>
    );
};

export default MacroViewer;
