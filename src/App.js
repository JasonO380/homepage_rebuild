import React from "react";
import MainRoutes from "./Routes/main_routes";
import HomePage from "./Homepage/homepage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes basename="/">
                <Route path="*" element={<MainRoutes />} />
            </Routes>
        </Router>
    );
}

export default App;
