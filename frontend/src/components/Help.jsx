import React, { useState } from "react";
import axios from "axios";

function Help() {
    const [name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Title, setTitle] = useState("");
    const [Report, setReport] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("text-red-600");

    const handleSubmit = async () => {
        if (!name || !Email || !Title || !Report) {
            setMessage("All fields are required.");
            setMessageColor("text-red-600");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(Email)) {
            setMessage("Please enter a valid email.");
            setMessageColor("text-red-600");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/Request`, {
                name: name,
                Email: Email,
                Tittle: Title,
                Report: Report,
            });

            if (response.data.success) {
                setMessage("Request created successfully!");
                setMessageColor("text-green-600");
                setName("");
                setEmail("");
                setTitle("");
                setReport("");
            }
        } catch (error) {
            console.error("Request Failed", error.response?.data || error.message);
            setMessage("Request Failed. Please try again.");
            setMessageColor("text-red-600");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-screen bg-gray-100 flex flex-col items-center md:ml-56">
            <h1 className="text-blue-950 font-bold text-4xl mt-10">Help</h1>
            {message && <p className={`mt-4 ${messageColor}`}>{message}</p>}
            <div className="bg-white shadow-md rounded-lg p-8 mt-6 w-96">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-blue-950 font-semibold mb-2">Name</label>
                        <input 
                            name="name"
                            id="name"
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="border border-blue-950 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" 
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-blue-950 font-semibold mb-2">Email</label>
                        <input 
                            name="Email"
                            id="email"
                            type="email" 
                            value={Email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="border border-blue-950 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" 
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="title" className="text-blue-950 font-semibold mb-2">Title</label>
                        <input 
                            name="Tittle"
                            id="title"
                            type="text" 
                            value={Title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            className="border border-blue-950 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" 
                            placeholder="Enter the subject of the report"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="report" className="text-blue-950 font-semibold mb-2">Report</label>
                        <textarea 
                            id="report"
                            name="Report"
                            value={Report} 
                            onChange={(e) => setReport(e.target.value)} 
                            className="border border-blue-950 rounded-lg px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-300" 
                            placeholder="Describe the issue..."
                        />
                    </div>
                    <button 
                        onClick={handleSubmit} 
                        className="bg-blue-950 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Help;


