import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const [userdata, setData] = useState([]); // Initialize as an empty array
  const [ques, setQues] = useState([]); // Store questions (X-axis labels)
  const [numb, setNumb] = useState([]); // Store question counts (Y-axis data)

  useEffect(() => {
    const name = localStorage.getItem("Leetuser");
    const fetchUserData = async (name) => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/Question`, { name });
        setData(response.data.tagProblemCounts.advanced); // Store response data
      } catch (error) {
        console.error("Error fetching user data:", error.response?.data || error.message);
      }
    };
    
    if (name) {
      fetchUserData(name);
    }
  }, []);

  // Use a separate useEffect to log userdata after it updates
  useEffect(() => {
    if (userdata.length > 0) {
      const questions = userdata.map((e) => e.tagName); // Extract question names
      setQues(questions); // Update ques state with the new list
      const number=userdata.map((e)=>e.problemsSolved)
      setNumb(number);
    }
  }, [userdata]);// This hook will run whenever userdata changes

  // Define the data for the chart
  const data = {
    labels: ques, // X-axis labels based on ques
    datasets: [
      {
        label: 'Advanced Question Counts', // Label for the dataset
        data: numb, // Y-axis data based on numb
        fill: false, // Do not fill the area under the line
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        tension: 0.1, // Line smoothing
      },
    ],
  };

  // Define the options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Position of the legend
      },
      tooltip: {
        mode: 'index', // Display tooltips when hovering over the chart
      },
    },
    scales: {
      x: {
        beginAtZero: true, // Start the x-axis from zero
        title: {
          display: true,
          text: 'Questions', // X-axis label
        },
      },
      y: {
        beginAtZero: true, // Start the y-axis from zero
        title: {
          display: true,
          text: 'Number of Questions Solved', // Y-axis label
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
