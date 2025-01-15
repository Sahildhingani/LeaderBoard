import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios';

// Register the necessary components for the Bar chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = () => {
  const [userdata, setData] = useState([]);
  const [ques, setQues] = useState([]);
  const [numb, setNumb] = useState([]);

  useEffect(() => {
    const name = localStorage.getItem("Leetuser");
    const fetchUserData = async (name) => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/Question`, { name });
        setData(response.data.tagProblemCounts.fundamental);
      } catch (error) {
        console.error("Error fetching user data:", error.response?.data || error.message);
      }
    };
    
    if (name) {
      fetchUserData(name);
    }
  }, []);

  useEffect(() => {
    if (userdata.length > 0) {
      const questions = userdata.map((e) => e.tagName);
      setQues(questions);
      const number = userdata.map((e) => e.problemsSolved);
      setNumb(number);
    }
  }, [userdata]);

  const data = {
    labels: ques,
    datasets: [{
      label: 'Questions Solved',
      data: numb,
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;

