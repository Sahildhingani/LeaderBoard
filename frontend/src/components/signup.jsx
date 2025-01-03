import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  // State variables
  const [username, setUsername] = useState("");
  const [leetcodeId, setLeetcodeId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State for success or error messages
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate(); // For navigation after signup

  // Handle Signup
  const handleSignup = async () => {
    if (!username || !leetcodeId || !email || !password) {
      setMessage("All fields are required.");
      return;
    }

    // Simple email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email.");
      return;
    }

    try {
      setLoading(true); // Start loading
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
        Fullname: username,
        Leetuser: leetcodeId,
        Email: email,
        Password: password,
      });

      if (response.data.success) {
        setMessage("User created successfully!"); // Success message
        setTimeout(() => navigate("/"), 2000); // Redirect after a short delay
      }
    } catch (error) {
      console.error("Signup Failed", error.response?.data || error.message);
      setMessage("Signup failed. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Create Your Account
        </h2>

        {/* Success or Error Message */}
        {message && (
          <div className={`text-center mb-4 ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </div>
        )}

        <form className="space-y-6">
          {/* Username Input */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="Fullname"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* LeetCode ID Input */}
          <div>
            <label
              htmlFor="leetcodeId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              LeetCode ID
            </label>
            <input
              type="text"
              id="leetcodeId"
              name="Leetuser"
              value={leetcodeId}
              onChange={(e) => setLeetcodeId(e.target.value)}
              placeholder="Enter your LeetCode ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Signup Button */}
          <div>
            <button
              type="button"
              onClick={handleSignup}
              className={`w-full py-2 rounded-lg transition duration-300 ${loading ? "bg-gray-400" : "bg-green-600 text-white hover:bg-green-700"}`}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

