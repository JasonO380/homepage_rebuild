import React from "react";
import { motion } from "framer-motion";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    DoughnutController,
    RadialLinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Doughnut } from 'react-chartjs-2';


import "./donut-chart.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    DoughnutController,
    RadialLinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const DonutChart = (props) => {
    ChartJS.defaults.color = "#FFFFFF";
    const date = new Date();
    console.log(props.items2)
    const monthName = date.toLocaleString("en-US", { month: "long" });
    const macrosForGraph = [props.items2];
    const macroGraphInfo = {
        labels: [
            "Carbs" + " " + macrosForGraph.map((macros) => macros.carbs),
            "Protein" + " " + macrosForGraph.map((macros) => macros.protein),
            "Fat" + " " + macrosForGraph.map((macros) => macros.fats),
        ],
        datasets: [
            {
                data: [
                    macrosForGraph.map((macros) => macros.carbs),
                    macrosForGraph.map((macros) => macros.protein),
                    macrosForGraph.map((macros) => macros.fats),
                ],
                backgroundColor: ["#257ff5", "#F06B2D", "#f8df00"],
                borderColor: ["#257ff5", "#F06B2D", "#f8df00"],
            },
        ],
    };
    const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text:
                    macrosForGraph.map((macros) => macros.month) +
                    " " +
                    macrosForGraph.map((macros) => macros.day),
                color: "#FFFFFF",
                font: {
                    size: 20,
                },
            },
        },
    };

    return (
        <motion.div
        initial={{ scale: 0 }}
        animate={{ 
            scale: 1, 
            transition: { type: "spring", bounce: 0.65, duration: 1.8 } 
            }}
        exit={{scale:0}} 
        className="doughnut">
            <Doughnut data={macroGraphInfo} options={chartOptions} />
        </motion.div>
    );
};

export default DonutChart;
