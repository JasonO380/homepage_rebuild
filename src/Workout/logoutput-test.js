import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import UpdateWorkouts from "./update-workouts";
import { motion } from "framer-motion";

const TestOutput = (props) => {
    let activities;
    let selectedWorkoutID
    let month;
    let foundDay;
    let updateArray = [];
    let loggedSession = [];
    let editArray = [];
    let sessionToday = props.workoutItems;
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const session = props.workoutItems
    // console.log(props.workoutItems);
    // console.log(sessionToday.map(s => s.movement))

    const fetchWorkouts = () => {
        console.log(props.updateWorkouts + " updateworkouts")
        props.updateWorkouts();
    };

    const updateHandler = (event) => {
        let selectedWorkoutToUpdate = event.target.name;
        selectedWorkoutID = event.target.value;
        console.log(selectedWorkoutID);
        // getWorkoutToUpdateId(selectedWorkoutID);
    };

    const getWorkoutToUpdateId = async (workoutID) => {
        console.log("here");
        console.log(isUpdateMode);
        try {
            const response = await fetch(
                `https://barbell-factor.onrender.com/api/workouts/${workoutID}`
            );
            const responseData = await response.json();
            const updateWorkout = responseData.workout;
            console.log("here in fetch");
            console.log(responseData);
            updateArray = [responseData]
            console.log(updateArray);
            UpdateDeleteModal(updateArray)
            setIsUpdateMode((prevIsUpdateMode) => !prevIsUpdateMode);
            console.log(isUpdateMode)
        } catch (err) {}
    };

    const UpdateDeleteModal = (updateInfo) => {
        console.log(updateInfo)
        console.log(isUpdateMode)
        editArray = updateInfo
        console.log("here in modal");
        console.log(editArray)
        return ReactDOM.createPortal(
            <UpdateWorkouts
                // fetch={fetchWorkouts}
                isUpdateMode={setIsUpdateMode}
                showUpdate={setIsUpdateMode}
                workoutitems={editArray}
            />,
            document.getElementById("overlay")
        );
    };

    //generates the new movement objects for the new month and day keys
    const generateMovementObjects = (session) => {
        return {
            id: session._id,
            movement: session.movement,
            rounds: session.rounds,
            reps: session.reps,
            weight: session.weight,
        };
    };

    //Check to see if month exists
    const doesMonthExist = (props) => {
        return loggedSession.find((lsession) => lsession.month === props.month);
    };

    //Check to see if day already existed in month...isMonthFound comes from the session.map() on bottom
    const doesDayExist = (isMonthFound, props) => {
        return isMonthFound.days.find(
            (monthDays) => monthDays.day === props.day
        );
    };

    //Helper method to generate activities based on day
    const generateDaySession = (props) => {
        return {
            day: props.day,
            activities: [generateMovementObjects(props)],
        };
    };

    //map through the incoming data
    sessionToday.map((sessions) => {
        let isMonthFound = doesMonthExist(sessions);
        if (isMonthFound) {
            let isDayFound = doesDayExist(isMonthFound, sessions);
            if (isDayFound) {
                isDayFound.activities.push(generateMovementObjects(sessions));
            } else {
                isMonthFound.days.push(generateDaySession(sessions));
            }
        } else {
            loggedSession.push({
                month: sessions.month,
                days: [generateDaySession(sessions)],
            });
        }
    });
    

    return (
        <React.Fragment>
        {isUpdateMode ? <UpdateDeleteModal /> : null }
        <div className="workout_wrapper">
                {loggedSession.map((session) => {
                    month = session.month;
                    const day = session.days;
                    foundDay = day.map((fDay) => fDay.day);
                    return (
                        <div className="workout_container">
                            <h2 className="workout_date_header">
                                {month} {foundDay}
                            </h2>
                            {day.map((fDay) => {
                                const foundActivities = fDay.activities;
                                foundDay = fDay.days;
                                return (
                                    <div className="session_container">
                                        {foundActivities.map((workouts) => {
                                            const wid = workouts.id;
                                            return (
                                                <div>
                                                    <React.Fragment>
                                                        <div className="movement_data">
                                                            <p>Movement:{workouts.movement}</p>
                                                            <p>Rounds:{workouts.rounds}</p>
                                                            <p>Reps:{workouts.reps}</p>
                                                            <p>Weight:{workouts.weight}</p>
                                                        </div>
                                                        <div className="button_container_workout_data_output">
                                                            <motion.button
                                                                value={wid}
                                                                whileTap={{scale: 0.8,}}
                                                                onClick={updateHandler}
                                                                className="form_button_workout_data"
                                                            >
                                                                Update
                                                            </motion.button>
                                                        </div>
                                                    </React.Fragment>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </React.Fragment>
    )
}

export default TestOutput;