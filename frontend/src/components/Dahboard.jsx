import React, { useEffect, useState } from "react";
import axios from "axios";
import Piechart from "./piechart";
import Pointchat from "./Linechart";
import LineChart from "./Linechart";
import BarChart from "./Polarchat";
function Dashboard() {
    // const [data,setdata]=useState(null);
    const [rank, setRank] = useState(null);
    const [acceptance, setAcceptance] = useState(null);
    const [submission, setSubmission] = useState(null);
    const [badge, setBadge] = useState(null);
    const [badgeName, setBadgeName] = useState(null);
    const [loadingRank, setLoadingRank] = useState(true);
    const [loadingAcceptance, setLoadingAcceptance] = useState(true);
    const [loadingSubmission, setLoadingSubmission] = useState(true);
    const [loadingBadge, setLoadingBadge] = useState(true);
    const [errorRank, setErrorRank] = useState(false);
    const [errorAcceptance, setErrorAcceptance] = useState(false);
    const [errorSubmission, setErrorSubmission] = useState(false);
    const [errorBadge, setErrorBadge] = useState(false);


    useEffect(() => {
        const name = localStorage.getItem("Leetuser");

        const fetchLeetcodeRank = async (name) => {
            try {
                const resp = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/getrank`, { name });
                setRank(resp.data.data);
            } catch (error) {
                console.error("Rank Generate ERROR::", error);
                setErrorRank(true);
            } finally {
                setLoadingRank(false);
            }
        };

        if (name) {
            fetchLeetcodeRank(name);
        }
    }, []);

    useEffect(() => {
        const name = localStorage.getItem("Leetuser");

        const fetchAcceptance = async (name) => {
            try {
                const resp = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/acceptance`, { name });
                setAcceptance(resp.data.acceptanceRate);
            } catch (error) {
                console.error("Acceptance ERROR::", error);
                setErrorAcceptance(true);
            } finally {
                setLoadingAcceptance(false);
            }
        };

        if (name) {
            fetchAcceptance(name);
        }
    }, []);

    useEffect(() => {
        const name = localStorage.getItem("Leetuser");

        const fetchSubmission = async (name) => {
            try {
                const resp = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/submission`, { name });
                setSubmission(resp.data.totalSubmissions);
            } catch (error) {
                console.error("Submission ERROR::", error);
                setErrorSubmission(true);
            } finally {
                setLoadingSubmission(false);
            }
        };

        if (name) {
            fetchSubmission(name);
        }
    }, []);

    useEffect(() => {
        const name = localStorage.getItem("Leetuser");

        const fetchBadge = async (name) => {
            try {
                const resp = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/badges`, { name });
                setBadge(resp.data.icon);
                setBadgeName(resp.data.displayName);
            } catch (error) {
                console.error("Badge ERROR::", error);
                setErrorBadge(true);
            } finally {
                setLoadingBadge(false);
            }
        };

        if (name) {
            fetchBadge(name);
        }
    }, []);

    return (
        <div className=" flex flex-col  md:ml-56">
            <h1 className="font-bold text-blue-950 text-3xl ml-24 mt-4 md:ml-5 md:mt-3">Dashboard</h1>
            <div className=" w-256 flex flex-col mt-8 gap-2 ml-20 md:flex-row md:justify-between md:ml-2">
                {/* // leetcode rank  */}
                <div className="h-24 w-48 bg-gray-200 flex flex-col rounded-lg items-center justify-center ">
                    <h1 className="text-gray-500 font-bold text-lg">Leetcode Rank</h1>
                    {loadingRank ? <h1 className="text-black font-bold">Loading...</h1> : errorRank ? <h1 className="text-black font-bold">N/A</h1> : <h1 className="text-lg font-bold text-black">{rank}</h1>}
                </div>
                {/* // acceptance  */}
                <div className="h-24 w-48 bg-gray-200 flex flex-col rounded-lg items-center justify-center">
                    <h1 className="text-gray-500 font-bold text-lg">Acceptance</h1>
                    {loadingAcceptance ? <h1 className="text-black font-bold">Loading...</h1> : errorAcceptance ? <h1 className="text-black font-bold">N/A</h1> : <h1 className="text-black font-bold">{acceptance}%</h1>}
                </div>
                {/* // submission  */}
                <div className="h-24 w-48 bg-gray-200 flex flex-col rounded-lg items-center justify-center">
                    <h1 className="text-gray-500 font-bold text-lg">Submission</h1>
                    {loadingSubmission ? <h1 className="text-black font-bold">Loading...</h1> : errorSubmission ? <h1 className="text-black font-bold">N/A</h1> : <h1 className="text-black font-bold">{submission}</h1>}
                </div>
                <div className="h-24 w-48 bg-gray-200 flex flex-col rounded-lg items-center justify-center">
                    <h1 className="text-gray-500 font-bold text-lg">Badges</h1>
                    {loadingBadge ? (
                        <h1 className="text-black font-bold">Loading...</h1>
                    ) : errorBadge ? (
                        <h1 className="text-black font-bold">N/A</h1>
                    ) : (
                        <div className="flex gap-2">
                            <img className="h-12 w-12 ml-2" src={badge} alt="Badge" />
                            <h1 className="text-black font-bold">{badgeName}</h1>
                        </div>
                    )}
                </div>
            </div>

            {/* // part 2 for graphs  */}

            <div className="flex flex-col w-screen md:flex-row md:w-256 md:ml-2 gap-5">
                <div className=" md:h-full w-80 md:ml-5 b ml-4">
                    <Piechart/>
                </div>
                <div className=" w-80 ml-1 md:w-160 md:h-128  flex justify-center items-center">
                    <LineChart/>
                </div>
            </div>
            <div className=" w-80 ml-1 md:w-256 md:ml-2 mt-5">
                <BarChart/>
            </div>
            
        </div>
    );
}

export default Dashboard;
