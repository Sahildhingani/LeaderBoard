import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import avatar from "../components/images/avatar_image.png";
import femaleavatar from "../components/images/femaleavatar-removebg-preview.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faTachometerAlt, faQuestionCircle, faSignOutAlt, faUsers } from '@fortawesome/free-solid-svg-icons';

function Nav() {
    const [name, setName] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [gender, setGender] = useState("Male");

    useEffect(() => {
        const storedName = localStorage.getItem("Fullname");
        const storedGender = localStorage.getItem("Gender");
        
        if (storedName) {
            setName(storedName);
        }
        
        if (storedGender) {
            setGender(storedGender);
        } else {
            setGender("Male");
        }

        console.log("Fetched Gender:", storedGender);
        console.log("Using Gender:", gender);
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/logout`);
            if (response.status === 200) {
                Cookies.remove('token');
                localStorage.removeItem("Fullname");
                localStorage.removeItem("Gender");
                window.location.href = '/';
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div>
            {/* Hamburger Menu for Smaller Screens */}
            {!menuOpen && (
                <button className="fixed top-5 left-5 z-50 md:hidden" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faBars} className="text-black text-2xl" />
                </button>
            )}

            {/* Sidebar Navigation */}
            <div className={`fixed top-0 left-0 h-screen w-56 bg-blue-950 md:flex flex-col items-center ${menuOpen ? "block" : "hidden"} md:block`}>
                {/* Close Button for Hamburger Menu */}
                {menuOpen && (
                    <button className="absolute top-5 right-5 z-50 md:hidden" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faTimes} className="text-white text-2xl" />
                    </button>
                )}

                {/* User Info */}
                <div className="flex flex-col mt-8 items-center mr-3">
                    <img 
                        className={`h-24 ${gender === "Male" ? "w-20" : "w-24"}`} 
                        src={gender === "Female" ? femaleavatar : avatar} 
                        alt="user avatar" 
                    />
                    <h1 className="text-lg font-semibold text-gray-500">{name || "User"}</h1>
                </div>

                {/* Navigation Links */}
                <div className="h-128 flex flex-col items-center mt-5 justify-around ">
                    <div className="flex gap-2 items-center mr-8">
                        <FontAwesomeIcon icon={faHome} className="text-gray-300" />
                        <Link to="/home" className="text-gray-300 font-semibold hover:text-white">Home</Link>
                    </div>
                    <div className="flex gap-2 items-center mr-1">
                        <FontAwesomeIcon icon={faTachometerAlt} className="text-gray-300" />
                        <Link to="/dashboard" className="text-gray-300 font-semibold hover:text-white">Dashboard</Link>
                    </div>
                    <div className="flex gap-2 items-center mr-12">
                        <FontAwesomeIcon icon={faQuestionCircle} className="text-gray-300" />
                        <Link to="/help" className="text-gray-300 font-semibold hover:text-white">Help</Link>
                    </div>
                    <div className="mr-7 mt-2">
                        <button onClick={handleLogout} className="flex gap-2 items-center text-gray-300 font-semibold mt-auto mb-8 hover:text-white">
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Nav;





