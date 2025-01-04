import React from "react";

function Card({ username, leetcoderank, questions }) {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-md bg-gray-200 shadow-md rounded-lg p-4 m-2 space-y-2 sm:space-y-0 sm:space-x-4 hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <h1 className="text-lg font-semibold text-gray-800">{username}</h1>
            <h2 className="">
                 <span className="font-medium text-gray-900">{questions || "0"}</span>
            </h2>
        </div>
    );
}

export default Card;
