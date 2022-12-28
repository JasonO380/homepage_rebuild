import React, { useContext, useState, useEffect } from "react";
import { LoginRegisterContext } from "../Authenticate/login-register-context";
import GetAllWorkoutsCreateObjects from "./get-all-workouts-create-objects";
import MonthSelect from "../SharedComponents/month-select";
import LoadingSpinner from "../SharedComponents/LoadingSpinner";
import { motion } from "framer-motion";
import { centerDiv } from "../CSS/variables/global-div-styles";
import "./get-all-workouts.css";

let choice;
let foundMonth = [];
let userID
const GetAllWorkouts = (props) => {
    const auth = useContext(LoginRegisterContext);
    const [trainingMonth, setTrainingMonth] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSelectedMonthLoaded, setIsSelectedMonthLoaded] = useState(false);

    const handleSelect = (event) => {
        choice = event.target.value;
        console.log(isSelectedMonthLoaded);
        fetchWorkouts();
    };

    const fetchWorkouts = async () => {
        setIsLoading(true)
        userID = auth.userID;
        try {
            const response = await fetch(
                `https://barbell-factor.onrender.com/api/workouts/workoutlog/${userID}`
            );
            const responseData = await response.json();
            const session = responseData.workout.reverse();
            getMonths(session);
            console.log(responseData.workout);
        } catch (err) {}
        setIsLoading(false)
    };

    useEffect(()=> {
        setIsSelectedMonthLoaded(true)
    },[choice])

    useEffect(()=> {
        fetchWorkouts();
    }, [])

    const getMonths = (session) => {
        let month;
        const date = new Date();
        const currentMonth = date.toLocaleDateString("en-US", {
            month: "long",
        });
        let monthSession = new Set();
        if(!isSelectedMonthLoaded){
            month = currentMonth;
        } else {
            setIsSelectedMonthLoaded(true)
            month = choice;
        }
        session.map(sessions => {
            if(sessions.month === month){
                monthSession.add(sessions)
            }
        });
        console.log(month);
        foundMonth = [...monthSession];
        setTrainingMonth(foundMonth);
        console.log(foundMonth);
    };

    if(foundMonth.length === 0){
        return (
            <div className="get_all_workouts_wrapper">
            <MonthSelect onChange={handleSelect} />
            {isLoading && <LoadingSpinner />}
                <motion.h2
                style={centerDiv}
                initial={{ scale: 0 }}
                animate={{ 
                    scale: 1, 
                    transition: { type: "spring", bounce: 0.65, duration: 1.8 } 
                    }}
                exit={{scale:0}}
                >No data yet for the selected month</motion.h2>
            </div>
        )
    }

    return (
        <React.Fragment>
        <div 
        className="get_all_workouts_wrapper"
        key={trainingMonth}
        initial={{ y: -500 }}
        animate={{y: 0, transition: { type: "spring", bounce: 0.65, duration: 0.8 }, }}
        exit={{ x: window.innerWidth, transition: { duration: 0.35 } }}>
            <MonthSelect onChange={handleSelect} />
            {isLoading && <LoadingSpinner />}
            <GetAllWorkoutsCreateObjects session={trainingMonth} />
        </div>
        </React.Fragment>
    );
};

export default GetAllWorkouts;
