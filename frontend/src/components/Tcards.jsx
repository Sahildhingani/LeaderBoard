import React from "react";
import { Link } from "react-router-dom";
function Tcard({ name, Ques }) {
    return (
        <Link to={`/question/${name}`}>
        <div className=" h-10 w-96 md:w-320 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 flex justify-between items-center text-center">
            {/* Topic Name */}
            <h1 className="text-xl font-bold text-blue-800">{name}</h1>

            {/* Number of Questions */}
            <h2 className="text-gray-600 text-lg ">{Ques} Questions</h2>

            {/* Icon */}
            <img 
                src="https://cdn-icons-png.flaticon.com/512/271/271228.png" 
                alt="Topic Icon" 
                className="w-6 h-6 "
            />
        </div>
        </Link>
    );
}

export default Tcard;
