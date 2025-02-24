import React, { useState } from "react";
import listData from "../Question"; // Import list
import Qcard from "../components/QuestionCard";
import { useParams } from "react-router-dom";

function QuestionList() {
    const [questions, setQuestions] = useState([...listData]); // ✅ Make a new array copy
 // Store list in state
    const { name } = useParams();

    // const toggleSolved = (key) => {
    //     console.log("Toggle clicked for ID:", key);
    //     setQuestions((prevQuestions) => {
    //         const updatedQuestions = prevQuestions.map((q) =>
    //             q.key === key ? { ...q, solved: !q.solved } : q
    //         );
    //         console.log("Updated Questions:", updatedQuestions); // Debugging
    //         return updatedQuestions; // ✅ Return a new array
    //     });
    // };
    
    
    
    

    return (
        <div className="h-full w-full flex flex-col items-center">
            <div className="w-full flex md:justify-start justify-center mt-1">
                <h1 className="text-3xl font-bold text-blue-950 mt-2 md:ml-60">{name}</h1>
            </div>

            {/* List of all the questions */}
            <div className="flex flex-col gap-2 mt-2 md:mt-5 md:ml-8">
                {questions
                    .filter((e) => e.type === name) // ✅ Corrected filter function
                    .map((e, index) => (
                        <Qcard
                            key={e.key}
                            id={e.key} // ✅ Added id for toggleSolved function
                            name={e.name}
                            link={e.link}
                            solved={e.solved}
                            // toggleSolved={toggleSolved}
                            number={index + 1}
                        />
                    ))}
            </div>
        </div>
    );
}

export default QuestionList;



