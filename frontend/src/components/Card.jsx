import React from "react";

function Card({ rank = 0, username = "Unknown User", ranking = "N/A", questions = 0 }) {
    // Utility function for dynamic styling based on ranking
    const getRankingClass = (ranking) => {
        if (ranking === "N/A") return "text-gray-600";
        if (ranking <= 10) return "text-green-500";
        if (ranking <= 50) return "text-yellow-500";
        return "text-red-500";
    };

    // Function to get crown based on rank
    const getCrown = (rank) => {
        if (rank === 1) return "👑"; // Golden Crown
        if (rank === 2) return "🥈"; // Silver Crown
        if (rank === 3) return "🥉"; // Bronze Crown
        return null; // No crown for other ranks
    };

    return (
        <div className="border-2 flex w-80 md:w-192 items-center justify-around border-black h-10 rounded-2xl bg-blue-950 flex-wrap">
            <h1 className="font-bold text-gray-200 text-lg">{rank}</h1>
            <h1 className="font-bold text-gray-200 text-lg flex items-center">
                {username} {getCrown(rank) && <span className="ml-1">{getCrown(rank)}</span>}
            </h1>
            <h1 className="font-bold text-gray-200 text-lg">{questions}</h1>
        </div>
    );
}

export default Card;




