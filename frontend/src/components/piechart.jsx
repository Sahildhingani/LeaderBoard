import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
// Import Chart.js components
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import axios from "axios";

// Register the Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function Piechart() {
    // State to hold fetched data
    const [chartData, setChartData] = useState({
        labels: ["Easy", "Medium", "Hard"],
        datasets: [
            {
                label: "LeetCode Problems",
                data: [0, 0, 0], // Default values
                backgroundColor: ["#4CAF50", "#FFC107", "#FF5722"],
                borderColor: ["#4CAF50", "#FFC107", "#FF5722"],
                borderWidth: 1,
            },
        ],
    });

    const [problemCounts, setProblemCounts] = useState({
        easy: 0,
        medium: 0,
        hard: 0,
    });

    // Fetch user data from backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/ranking`, {
                     name : String(localStorage.getItem("Leetuser")),
                });
                const data = response.data.progress.numAcceptedQuestions;
                console.log(data);

                // Map the data to chart values
              // Adjusting the difficulty levels to match the response from the backend
const counts = {
    easy: data.find((item) => item.difficulty === "EASY")?.count || 0,
    medium: data.find((item) => item.difficulty === "MEDIUM")?.count || 0,
    hard: data.find((item) => item.difficulty === "HARD")?.count || 0,
};

console.log(counts); // This will show the correct count for each difficulty


                setProblemCounts(counts);
                setChartData((prevData) => ({
                    ...prevData,
                    datasets: [
                        {
                            ...prevData.datasets[0],
                            data: [counts.easy, counts.medium, counts.hard],
                        },
                    ],
                }));
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

    // Doughnut Chart Options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Profile Data Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    Sahil Dhingai
                </h2>
                {/* Doughnut Chart */}
                <Doughnut data={chartData} options={options} />
                <div className="mt-4">
                    <p className="text-gray-700 font-semibold">
                        Easy: {problemCounts.easy} Questions
                    </p>
                    <p className="text-gray-700 font-semibold">
                        Medium: {problemCounts.medium} Questions
                    </p>
                    <p className="text-gray-700 font-semibold">
                        Hard: {problemCounts.hard} Questions
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Piechart;

