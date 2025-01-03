import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/slice'; // Adjust path as needed

function Buttons() {
    const [isGeneralRankingDisabled, setIsGeneralRankingDisabled] = useState(false); // Track if the button is disabled
    const dispatch = useDispatch();

    const Grouphandler = () => {
        alert("You are Not Authorized");
    };

    // Get rank of the user
    const generalHandle = async () => {
        setIsGeneralRankingDisabled(true); // Disable the button when clicked

        try {
            // Fetch all user data from the backend
            const Userdata = await axios.post(`${import.meta.env.BACKEND_URL}/user/getdata`);

            if (!Userdata?.data?.data) {
                console.error("User Data Fetch Failed: No data found");
                return;
            }

            const users = Userdata.data.data;

            // Use Promise.all to process multiple async requests in parallel
            await Promise.all(
                users.map(async (user) => {
                    const name = user.Leetuser; // Ensure 'Leetuser' is correct
                    
                    if (!name) {
                        console.warn("Invalid username in user data:", user);
                        return;
                    }

                    try {
                        // Get ranking data for each user
                        const quesResp = await axios.post(`${import.meta.env.BACKEND_URL}/user/ranking`, { name });

                        if (!quesResp?.data?.progress?.numAcceptedQuestions) {
                            console.warn(`No questions data available for user: ${name}`);
                            return;
                        }

                        // Calculate the total solved questions
                        const numAcceptedQuestions = quesResp.data.progress.numAcceptedQuestions;
                        const totalSolved = numAcceptedQuestions.reduce((sum, q) => sum + Number(q.count), 0);

                        console.log(`Total solved questions for ${name}:`, totalSolved);

                        // Now dispatch username, name, and question to redux
                        dispatch(
                            addUser({
                                name,
                                totalSolved,
                            })
                        );

                    } catch (quesError) {
                        console.error(`Error fetching ranking data for ${name}:`, quesError.message);
                        if (quesError.response) {
                            console.error("Questions fetch error response:", quesError.response.data);
                        }
                    }
                })
            );

            console.log("All user data processed successfully.");
        } catch (error) {
            console.error("User Data Fetch Error:", error.message);
            if (error.response) {
                console.error("User data fetch error response:", error.response.data);
            }
        }
    };

    return (
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-md mx-auto">
            <button
                 
                onClick={generalHandle} // Corrected to pass the async function
                className={`w-full sm:w-1/2 bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 transform hover:scale-105 ${isGeneralRankingDisabled ? "bg-blue-300 cursor-not-allowed" : ""}`}
                disabled={isGeneralRankingDisabled} // Disable button after click
            >
                General Ranking
            </button>
            <button
                onClick={Grouphandler}
                className="w-full sm:w-1/2 bg-green-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 transform hover:scale-105"
            >
                Create Group
            </button>
        </div>
    );
}

export default Buttons;



