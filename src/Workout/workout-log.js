import React, { useState, useEffect, useContext } from "react";
import WorkoutForm from "./workout-form";
import WorkoutLogOutput from "./workout-log-output";
import TestOutput from "./logoutput-test";
import { LoginRegisterContext } from "../Authenticate/login-register-context";

let userID;
let todaysSession = [];
const WorkoutLog = () => {
    const [newEntries, setNewEntries] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [isNewDayToAdd, setIsNewDayToAdd] = useState(false);
    const auth = useContext(LoginRegisterContext);
    userID = auth.userID;
    //Helper function to get newly added workout entries on the day
    const getNewWorkoutEntries = (session) => {
        setNewEntries([...newEntries, session]);
    };

    const handleDelete = () => {
        fetchWorkouts()
    }

    const fetchWorkouts = async () => {
        let finalEditSet = new Set();
        const userID = auth.userID;
        try {
            const response = await fetch(
                `https://barbell-factor.onrender.com/api/workouts/workoutlog/${userID}`
            );
            const responseData = await response.json();
            const session = responseData.workout;
            console.log(session);
            const date = new Date();
            const currentDay = date.getDate();
            const currentMonth = date.toLocaleString("en-US", {
                month: "long",
            });
            session.map((s) => {
                if (s.day === currentDay && s.month === currentMonth) {
                    setIsNewDayToAdd(true);
                    finalEditSet.add(s);
                } 
            });
            todaysSession = [...finalEditSet];
        } catch (err) {}
        setWorkouts(todaysSession)
    };

    useEffect(() => {
        fetchWorkouts()
    }, [userID, newEntries]);

    return (
        <React.Fragment>
            <div
                className="workout_page_container"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
            >
                <WorkoutForm workoutFormItems={getNewWorkoutEntries} />
                {isNewDayToAdd ? (
                    <TestOutput
                    updateWorkouts={handleDelete} 
                    workoutItems={workouts} />
                ) : null}
                {/* {isNewDayToAdd ? (
                    <WorkoutLogOutput
                    updateWorkouts={handleDelete} 
                    workoutItems={workouts} />
                ) : null} */}
            </div>
        </React.Fragment>
    );
};

export default WorkoutLog;
