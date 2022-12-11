import React from "react";
import Login from "../Authenticate/login";
import HomePage from "../Homepage/homepage";
import Register from "../Authenticate/register";
import WorkoutLog from "../Workout/workout-log";
import MacroLogger from "../Macros/macro-logger";
import MacroViewer from "../Macros/macro-viewer";
import Dashboard from "../Dashboard/dashboard";
import NavBar from "../Nav/nav";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/workoutlog" element={<WorkoutLog />} />
                <Route path="/macroslogger" element={<MacroLogger />} />
                <Route path="/macrosview" element={<MacroViewer />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
