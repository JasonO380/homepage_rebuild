import React, { useState, useContext } from "react";
import UpdateWorkouts from "./update-workouts";
import { LoginRegisterContext } from "../Authenticate/login-register-context";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";


let month;
let foundDay;

const WorkoutLogOutput = (props) => {
    console.log(props.workoutItems);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const auth = useContext(LoginRegisterContext);
    let workoutsForTheDay = props.workoutItems;
    console.log(workoutsForTheDay.movement);
    const [editArray, setEditArray] = useState([]);
    //Holds the month workout data
    let loggedSession = [];
    let updateArray = [];
    
    const fetchWorkouts = () => {
        console.log(props.updateWorkouts + " updateworkouts")
        props.updateWorkouts();
    };

    const updateHandler = (event) => {
        let selectedWorkoutToUpdate = event.target.name;
        let selectedWorkoutID = event.target.value;
        console.log(event.target.name);
        console.log(selectedWorkoutID);
        console.log(selectedWorkoutToUpdate);
        getWorkoutToUpdateId(selectedWorkoutID);
        console.log(isUpdateMode);
    };

    const getWorkoutToUpdateId = async (workoutID) => {
        console.log("here");
        setIsUpdateMode(true);
        console.log(isUpdateMode);
        try {
            const response = await fetch(
                `https://barbell-factor.onrender.com/api/workouts/${workoutID}`
            );
            const responseData = await response.json();
            const updateWorkout = responseData.workout;
            console.log("here in fetch");
            console.log(responseData);
            setEditArray(updateWorkout);
            console.log(editArray);
            updateArray.push(updateWorkout);
            console.log(updateArray);
            setIsUpdateMode(true);
        } catch (err) {}
    };

    const UpdateDeleteModal = () => {
        console.log("here in modal");
        console.log(updateArray);
        console.log(editArray);
        return ReactDOM.createPortal(
            <UpdateWorkouts
                fetch={fetchWorkouts}
                isUpdateMode={setIsUpdateMode}
                showUpdate={setIsUpdateMode}
                workoutitems={editArray}
            />,
            document.getElementById("update-delete-overaly")
        );
    };
    return (
        <React.Fragment>
        {isUpdateMode && <UpdateDeleteModal />}
        <div>
            {workoutsForTheDay.map(session=> {
                month = session.month;
                const day = session.day;
                foundDay = day.map(fDay=> fDay.day)
                return (
                    <React.Fragment>
                    <div>
                        <h2>
                            {session.month} {session.day}
                        </h2>
                    </div>
                    <div>
                    <div>
                        <p>Movement:{session.movement}</p>
                        <p>Rounds:{session.rounds}</p>
                        <p>Reps:{session.reps}</p>
                        <p>Weight:{session.weight}</p>
                    </div>
                    <div>
                        <motion.button
                            value={session.id}
                            whileTap={{scale: 0.8,}}
                            onClick={updateHandler}
                            className="form_button_workout_data"
                            >
                            Update
                        </motion.button>
                    </div>
                    </div>
                    </React.Fragment>
                )
            })}
        </div>
        </React.Fragment>
    )
}

export default WorkoutLogOutput;


// {workoutsForTheDay.map(session=> {
//     month = session.month;
//     const day = session.day;
//     foundDay = day.map(fDay=> fDay.day)
//     return (
//         <React.Fragment>
//         <div>
//             <h2>
//                 {session.month} {session.day}
//             </h2>
//         </div>
//         <div>
//         <div>
//             <p>Movement:{session.movement}</p>
//             <p>Rounds:{session.rounds}</p>
//             <p>Reps:{session.reps}</p>
//             <p>Weight:{session.weight}</p>
//         </div>
//         <div>
//             <motion.button
//                 value={session.id}
//                 whileTap={{scale: 0.8,}}
//                 onClick={updateHandler}
//                 className="form_button_workout_data"
//                 >
//                 Update
//             </motion.button>
//         </div>
//         </div>
//         </React.Fragment>
//     )
// })}