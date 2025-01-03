import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Login() {
  // State variables
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(""); // To store error messages
  const navigate = useNavigate();

  // Handle Login
  const handleLogin = async () => {
    if (!email || !pass) {
      setError("Email and password are required.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.BACKEND_URL}/user/login`, {
        Email: email,
        Password: pass,
      });

      if (response.data.success) {
        // Store the leetuser in local storage
        localStorage.setItem("Leetuser", response.data.leetuser);
        localStorage.setItem("Fullname",response.data.Fullname);
        // Set a cookie that expires in 1 day
document.cookie = `token=${response.data.Token}; path=/; max-age=86400; secure; sameSite=Strict`;

        // Redirect to home page
        navigate("/ranking");
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      setError("Login Failed. Please try again later.");
      console.error("Login Failed", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Login to Your Account
        </h2>

        {/* Error Message */}
        {error && (
          <div className="text-red-600 text-center mb-4">
            {error}
          </div>
        )}

        <form className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
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
              name="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Login Button */}
          <div>
            <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
