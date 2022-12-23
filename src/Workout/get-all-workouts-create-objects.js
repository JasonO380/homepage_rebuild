import React from "react";
import { motion } from "framer-motion";
import "./create-month-training-objects.css"

const GetAllWorkoutsCreateObjects = (props) => {
    const session = props.session;
    console.log(session)
    const loggedSession = [];
    const animation = {
        offscreen: { scale:0 },
        onscreen: {
            scale: 1,
            transition: { type: "spring", bounce: 0.65, duration: 0.8 },
        },
    };
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
    session.map((sessions) => {
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
        <motion.div 
        className="workout_wrapper"
        initial={{y: -500}}
        animate={{y: 0, transition: { type: "spring", bounce: 0.65, duration: .8 }}}
        exit={{x: window.innerWidth, transition: {duration: .35}}} >
            {loggedSession.map(session => {
                const month = session.month
                const days = session.days;
                return(
                    <div className="workout_container">
                        <h1 className="workout_month_header">{month}</h1>
                        {days.map(fDay => {
                            const day = fDay.day;
                            const training = fDay.activities.reverse();
                            return (
                                <div className="session_container">
                                    <h2 className="workout_date_header">{day}</h2>
                                    {training.map(session =>{
                                        return (
                                            <motion.div
                                            initial={"offscreen"}
                                            whileInView={"onscreen"} 
                                            viewport={{ once: false, amount: .45 }}
                                            className="movement_data_container">
                                                <React.Fragment>
                                                    <motion.div
                                                    variants={animation} 
                                                    className="movement_data">
                                                        <p>
                                                            Movement:
                                                            {session.movement}
                                                        </p>
                                                        <p>
                                                            Rounds:
                                                            {session.rounds}
                                                        </p>
                                                        <p>
                                                            Reps:{session.reps}
                                                        </p>
                                                        <p>
                                                            Weight:
                                                            {session.weight}
                                                        </p>
                                                    </motion.div>
                                                </React.Fragment>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </motion.div>
    )
}

export default GetAllWorkoutsCreateObjects;