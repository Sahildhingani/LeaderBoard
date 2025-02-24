import React, { useState } from "react";
import image1 from "../components/images/contest1234.png";
import list from "../Question";
import Qcard from "./QuestionCard";
import Tcard from "./Tcards";
import Topics from "../Topics";
function Contest() {
    const [ques, setques] = useState("all");

    return (
        <>
            <div className="h-full w-full bg-white flex flex-col md:ml-60">
                {/* Title of the page */}
                <div className="flex justify-center mt-3 md:justify-start">
                    <h1 className="font-bold text-blue-950 text-4xl">Contest</h1>
                </div>

                {/* Contest section */}
                <div className="border- border-black flex flex-col items-center md:flex-row md:gap-8 md:mt-5">
                    {/* Contest Cards */}
                    {[1, 2, 3 ,4].map((num) => (
                        <div key={num} className="mt-2">
                            <a href={`https://leetcode.com/contest/leetcode-weekly-contest-${num + 1}/`}>
                                <img src={image1} className="rounded-xl border-black border-2 w-80 shadow-gray-700 shadow-lg" alt={`Daily Contest ${num}`} />
                                <h1 className="text-black font-bold text-2xl">Daily Contest {num}</h1>
                            </a>
                        </div>
                    ))}
                </div>

                {/* Questions Section */}
                <div className="flex justify-center items-center mt-3 md:justify-start md:mt-8">
                    <h1 className="text-blue-950 font-bold text-3xl">Questions</h1>
                </div>

                {/* // list of all the topic  */}
                <div className="flex flex-col gap-2 items-start mt-4 flex-wrap">
                    {
                        Topics.map((e)=><Tcard name={e.name} Ques={e.Question} />)
                    }
                </div>
            </div>
        </>
    );
}

export default Contest;
