import React from "react";

function Qcard({ number, name, link, solved, toggleSolved, id }) {
    return (
        <div className="w-full md:w-192 mx-auto bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-200 rounded-lg p-4 flex items-center gap-4">
            {/* Question Number */}
            <span className="text-lg font-bold text-black">{number}.</span>

            {/* Question Name */}
            <a href={link} target="_blank" rel="noopener noreferrer" className="flex-1 text-black hover:underline text-lg font-semibold">
                {name}
            </a>

            {/* Solved Checkbox */}
            {/* <input
                type="checkbox"
                checked={solved}
                onChange={() => toggleSolved(id)}  // Update parent state
                className="w-5 h-5 accent-blue-600 cursor-pointer"
            /> */}
        </div>
    );
}

export default Qcard;


