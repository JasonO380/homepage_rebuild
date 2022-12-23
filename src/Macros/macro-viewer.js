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
let month;
const MacroViewer = (props) => {
    const auth = useContext(LoginRegisterContext);
    let userID;
    let foundMonth = [];
    let macroData;
    const [isLoading, setIsLoading] = useState(false)
    const [isSelectedMonthLoaded, setIsSelectedMonthLoaded] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState();
    const [macroMonth, setMacroMonth] = useState();
    const date = new Date();
    const currentMonth = date.toLocaleDateString("en-US", {month: "long",});
    
    const handleSelect = (event) => {
        console.log("here");
        // const choice = event.target.value;
        choice = event.target.value;
        // setSelectedMonth(choice);
        // console.log(selectedMonth);
        fetchMacros();
    };

    if(!isSelectedMonthLoaded){
        month = currentMonth
    }
    if(isSelectedMonthLoaded){
        month = choice
    }

    useEffect(()=>{
        setSelectedMonth(currentMonth)
        fetchMacros()
    },[])

    const fetchMacros = async () => {
        console.log('here too')
        setIsLoading(true)
        userID = auth.userID;
        try {
            const response = await fetch(
                `https://barbell-factor.onrender.com/api/macros/macroslog/${userID}`
            );
            const responseData = await response.json();
            const macros = responseData.macros;
            macroData = macros.reverse();
            // setMacroMonth(macroData);
            console.log(macroMonth)
            getMonths(macroData);
        } catch (err) {}
        setIsLoading(false)
    };

    const getMonths = (macroData) => {
        // let month;
        console.log(choice)
        console.log(macroData)
        console.log(isSelectedMonthLoaded)
        console.log(selectedMonth)
        const date = new Date();
        const currentMonth = date.toLocaleDateString("en-US", {
            month: "long",
        });
        let monthMacros = new Set();
        if(!isSelectedMonthLoaded){
            month = currentMonth;
        } else {
            setIsSelectedMonthLoaded(true)
            month = choice;
        }
        console.log(month)
        macroData.map((m) => {
            // console.log(m);
            if (month === m.month) {
                setIsSelectedMonthLoaded(true);
                monthMacros.add(m)
                // foundMonth.push(m);
                // foundMonth = macros;
            }
            // if (foundMonth.length === 0) {
            //     console.log(foundMonth.length);
            //     setIsSelectedMonthLoaded(false);
            //     console.log(isSelectedMonthLoaded);
            // }
        });
        foundMonth = [...monthMacros]
        console.log(foundMonth);
        setMacroMonth(foundMonth)
        console.log(macroMonth)
    };

    useEffect(()=>{
        setIsSelectedMonthLoaded(true)
        setSelectedMonth(choice)
    },[choice])

    // if (!selectedMonth && !isSelectedMonthLoaded) {
    //     return (
    //         <div className="macro_viewer_wrapper">
    //         {isLoading && <LoadingSpinner />}
    //             <MonthSelect
    //                 name={selectedMonth}
    //                 onChange={handleSelect}
    //                 isLoaded={setIsSelectedMonthLoaded}
    //             />
    //             <motion.div
    //                 style={centerDiv}
    //                 initial={{ width: 0 }}
    //                 animate={{ width: "100%" }}
    //                 exit={{
    //                     x: window.innerWidth,
    //                     transition: { duration: 0.2 },
    //                 }}
    //             >
    //                 <h2>Please select a month to view macro for that month</h2>
    //             </motion.div>
    //         </div>
    //     );
    // }

    if (!macroMonth) {
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
                {isLoading && <LoadingSpinner />}
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
        {isLoading && <LoadingSpinner />}
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
                {/* {foundMonth.map(macros => {
                    return <DonutChart items2={macros} />
                })} */}
                {macroMonth.map((macros) => {
                    {/* if (month === macros.month) { */}
                        return <DonutChart items2={macros} />;
                    {/* } */}
                })}
            </motion.div>
        </div>
    );
};

export default MacroViewer;
