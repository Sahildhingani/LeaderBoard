import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Nav from "./components/nav";
import { useSelector } from "react-redux";
import axios from "axios";
import Ranking from "./components/Ranking";


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

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/ranking`);
    //             console.log("Fetched Data:", response.data.todo.users);
    //         } catch (error) {
    //             console.error("Error fetching data:", error.message);
    //         }
    //     };

    //     fetchData(); // Call the fetch function
    // }, []);

    return (
        <div className=" h-screen w-screen flex flex-wrap overflow-x-hidden">
            <Nav/>
            <Outlet/>
        </div>       
    );
}

export default Layout;


