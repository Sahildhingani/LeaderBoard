import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function Nav() {
    const [name, setname] = useState("");

    useEffect(() => {
        // Get Fullname from localStorage
        setname(localStorage.getItem("Fullname"));
    }, []); // Run only once when the component mounts

    const handlelogout = async () => {
        try {
            // Call the logout endpoint
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/logout`);
            
            if (response.status === 200) {
                // Clear cookies and localStorage after successful logout
                Cookies.remove('token'); // Assuming the token cookie is named 'token'
                localStorage.removeItem("Fullname");
                
                // Optionally, redirect to login page
                window.location.href = '/';
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="bg-blue-950 p-4 shadow-md flex flex-col sm:flex-row items-center justify-between">
            {/* Logo or Name Section */}
            <div className="flex items-center space-x-2">
                <h1 className="text-white font-bold text-xl sm:text-2xl">{name}</h1>
            </div>

            {/* Title Section */}
            <h1 className="text-white font-extrabold text-3xl mt-2 sm:mt-0">Leaderboard</h1>

            {/* Logout Button */}
            <button
                onClick={handlelogout}
                className="bg-red-600 text-white font-semibold text-lg px-4 py-2 rounded hover:bg-red-700 transition duration-300 mt-4 sm:mt-0"
            >
                Logout
            </button>
        </div>
    );
}

export default Nav;


