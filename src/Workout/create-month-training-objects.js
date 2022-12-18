import React from "react";
import { motion } from "framer-motion";
import buttonStyle from "../CSS/variables/button_style";
import './create-month-training-objects.css';

const CreateMonthTrainingObjects = (props) => {
    const initialSession = props.session;
    const loggedSession = [];
    let month;
    let foundDay;
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
    initialSession.map((sessions) => {
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
                                            <div className="movement_data_container">
                                                <React.Fragment>
                                                    <div className="movement_data">
                                                        <p>
                                                            Movement:
                                                            {workouts.movement}
                                                        </p>
                                                        <p>
                                                            Rounds:
                                                            {workouts.rounds}
                                                        </p>
                                                        <p>
                                                            Reps:{workouts.reps}
                                                        </p>
                                                        <p>
                                                            Weight:
                                                            {workouts.weight}
                                                        </p>
                                                    </div>
                                                    <div className="button_container_workout_data_output">
                                                        <motion.button
                                                            value={wid}
                                                            whileTap={{
                                                                scale: 0.8,
                                                            }}
                                                            onClick={props.onClick}
                                                            style={buttonStyle}
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
    );
};

export default CreateMonthTrainingObjects;
