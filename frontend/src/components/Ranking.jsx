import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "../redux/slice"; // Adjust the import according to your file structure
import Card from "../components/Card"; // Adjust the import according to your file structure

function Ranking() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.leaderboard.users);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (users.length > 0) {
            setIsLoading(false);
            return; // Exit if users already exist
        }

        const fetchData = async () => {
            const token = Cookies.get("token");
            if (!token) {
                navigate("/"); // Redirect to login if no token
                return;
            }

            try {
                const users = await fetchUserData();

                await Promise.all(
                    users.map(async (user) => {
                        const name = user;
                        if (!name) {
                            console.warn("Invalid username in user data:", user);
                            return;
                        }

                        if (!users.some(u => u.name === name)) {
                            const numAcceptedQuestions = await fetchUserRanking(name);
                            const totalSolved = numAcceptedQuestions.reduce((sum, q) => sum + Number(q.count), 0);

                            const rank = await fetchleetcoderank(name);
                            const ranking = rank.data;

                            dispatch(addUser({ name, ranking, totalSolved }));
                        }
                    })
                );

                console.log("All user data processed successfully.");
            } catch (error) {
                console.error("Error processing user data:", error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [dispatch, users, navigate]);

    const fetchUserData = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/getdata`);
            return response?.data?.data || [];
        } catch (error) {
            console.error("Error fetching user data:", error.response?.data || error.message);
            throw error;
        }
    };

    const fetchUserRanking = async (name) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/ranking`, { name });
            return response?.data?.progress?.numAcceptedQuestions || [];
        } catch (error) {
            console.error(`Error fetching ranking data for ${name}:`, error.response?.data || error.message);
            throw error;
        }
    };

    const fetchleetcoderank = async (name) => {
        try {
            const resp = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/getrank`, { name });
            return resp.data;
        } catch (error) {
            console.error("Rank Generate ERROR::", error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen ml-32 md:ml-160">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="h-full w-full border-black border-10 flex flex-col items-center md:ml-52">
            {/* // leader board name  */}
            <div className="font-bold text-blue-950 text-4xl ml-5 mt-3 md:mt-8 flex items-center gap-2 flex-wrap md:mb-3">
                <FontAwesomeIcon icon={faMedal} className="text-yellow-500" />
                <h1>LeaderBoard</h1>
                <FontAwesomeIcon icon={faMedal} className="text-yellow-500" />
            </div>
            {/* // first rank bar  */}
            <div className="bg-blue-950 h-10 w-80 md:w-192 rounded-xl border-2 border-black flex justify-between items-center mt-3 flex-wrap">
                    <h1 className="text-gray-200 font-bold text-lg ml-2 md:ml-3">Rank</h1>
                    <h1 className="text-gray-200 font-bold text-lg">UserName</h1>
                    {/* <h1 className="text-gray-200 font-bold text-lg">LeetRank</h1> */}
                    <h1 className="text-gray-200 font-bold text-lg mr-2 md:mr-3">Total Ques.</h1>
                </div>
                {/* // user layers  */}
                <div className="flex flex-col gap-3 mt-3 mb-2">
                    {users.map((user, index) => (
                        <Card rank={index + 1} key={user.id} username={user.name} questions={user.totalSolved} />
                    ))}
                </div>
        </div>
    );
}
// ranking={user.ranking} 
export default Ranking;




