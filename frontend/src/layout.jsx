import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Nav from "./components/nav";
import Piechart from "./components/piechart";
import Buttons from "./components/button";
import Card from "./components/Card";
import { useSelector } from "react-redux";
import axios from "axios";

function Layout() {
    const navigate = useNavigate();
    const users = useSelector((state) => state.leaderboard.users);

    useEffect(() => {
        // Check if the token exists in cookies
        const token = Cookies.get("token");
        console.log("Token: ", token);
        if (!token) {
            navigate("/"); // Redirect to login if no token
        }
    }, [navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.BACKEND_URL}/user/ranking`);
                console.log("Fetched Data:", response.data.todo.users);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchData(); // Call the fetch function
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Nav />
            <div className="flex flex-col lg:flex-row mt-5 gap-5 px-4 sm:px-6 lg:px-10">
                {/* Button and Ranking Section */}
                <div className="flex-1 h-full max-w-full overflow-y-auto">
                    <Buttons />

                    {/* Ranking Section */}
                    <div className="flex flex-wrap gap-4 justify-center sm:justify-start mt-5 overflow-auto max-h-[calc(100vh-200px)]">
                        {users.map((user) => (
                            <Card
                                key={user.id}
                                username={user.name}
                                questions={`Solved: ${user.totalSolved}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Pie Chart Section */}
                <div className="flex-1 h-full max-w-full mt-5 lg:mt-0">
                    <Piechart />
                </div>
            </div>
        </div>
    );
}

export default Layout;


