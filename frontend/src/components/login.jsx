import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !pass) {
      setError("Email and password are required.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        {
          Email: email,
          Password: pass,
        }
      );

      if (response.data.success) {
        localStorage.setItem("Leetuser", response.data.leetuser);
        localStorage.setItem("Fullname", response.data.Fullname);
        document.cookie = `token=${response.data.Token}; path=/; max-age=86400; secure; sameSite=Strict`;
        navigate("/ranking");
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      setError("Login Failed. Please try again later.");
      console.error("Login Failed", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Login to Your Account
        </h2>

        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        <form className="space-y-6">
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

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner">
                  <div className="double-bounce1"></div>
                  <div className="double-bounce2"></div>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      {/* Add Spinner Styles */}
      <style>
        {`
          .spinner {
            position: relative;
            width: 20px;
            height: 20px;
          }

          .double-bounce1, .double-bounce2 {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: white;
            opacity: 0.6;
            position: absolute;
            top: 0;
            left: 0;
            animation: bounce 2s infinite ease-in-out;
          }

          .double-bounce2 {
            animation-delay: -1s;
          }

          @keyframes bounce {
            0%, 100% {
              transform: scale(0);
            } 
            50% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Login;




