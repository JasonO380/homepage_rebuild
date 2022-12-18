import React, { useState } from "react";
import CreateMonthTrainingObjects from "./create-month-training-objects";
import UpdateWorkouts from "./update-workouts";
import { motion, AnimatePresence } from "framer-motion";

const WorkoutLogOutput = (props) => {
    let selectedWorkoutID
    let updateArray = [];
    const [currentSession, setCurrentSession] = useState([updateArray])
    let sessionToday = props.workoutItems;
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    
    const fetchWorkouts = () => {
        console.log(props.updateWorkouts())
        props.updateWorkouts();
    };

    const updateHandler = (event) => {
        selectedWorkoutID = event.target.value;
        console.log(selectedWorkoutID);
        console.log(isUpdateMode)
        getWorkoutToUpdateId(selectedWorkoutID);
    };

    const getWorkoutToUpdateId = async (workoutID) => {
        //isUpdateMode and currentSession need to be in here so that the props for the updateworkouts component is received at the same time isUpdateMode becomes true due to async function
        try {
            const response = await fetch(
                `https://barbell-factor.onrender.com/api/workouts/${workoutID}`
            );
            const responseData = await response.json();
            const updateWorkout = responseData.workout;
            setCurrentSession(updateWorkout)
            updateArray = [updateWorkout]
            setIsUpdateMode(true);
        } catch (err) {}
    };

    if (isUpdateMode) {
        return (
            <AnimatePresence mode='wait'>
            <motion.div
            key={currentSession}
                initial={{
                    scale: 0,
                    opacity: 0,
                }}
                animate={{
                    rotateY: [0, 180, -180, 180, 0],
                    opacity: 1,
                    margin: "auto",
                    scale: [0.8, 1, 0.8, 1, 0.8, 1],
                    transition: {
                        duration: 0.75,
                        type: "spring",
                        bounce: 0.5,
                    },
                }}
                exit={{ scale:0, opacity:0 }}
            >
                <UpdateWorkouts
                    fetch={fetchWorkouts}
                    isUpdateMode={setIsUpdateMode}
                    showUpdate={setIsUpdateMode}
                    updateItems={currentSession}
                />
            </motion.div>
            </AnimatePresence>
        );
    }
    
    return (
        <CreateMonthTrainingObjects
        onClick={updateHandler} 
        session={sessionToday} />
    )
}

export default WorkoutLogOutput;
