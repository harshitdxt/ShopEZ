import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, Lock } from "lucide-react";

function LogInPage() {
  const [loginform, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const handlechange = (e) => {
    e.preventDefault();
    setLoginForm({ ...loginform, [e.target.name]: e.target.value });
    console.log("Handle change login form data", loginform);
  };
  console.log("Login Form Input data", loginform);

  const handlelogin = async () => {
    // Basic validation
    if (!loginform.email.trim() || !loginform.password.trim()) {
      toast.error("Please fill in all the fields.");
      return;
    }
    console.log("Login button is clicked", loginform);
    try {
      const result = await axios.post(
        "http://localhost:5000/api/v1/login",
        loginform,
        { withCredentials: true }
      );
      console.log("The Login is succesfully", result.data);
      alert("Login successful");
      login(result.data.data);
      toast.success("Welcome back!");

      const userType = result.data.data.userType;
      if (userType === "customer") {
        navigate("/customer");
      } else if (userType === "seller") {
        navigate("/seller");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
          <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-2">
            ShopEZ
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Welcome back! Please log in to your account.
          </p>

          <div className="space-y-5">
            {/* Email Field */}
            <div className="relative">
              <Mail
                className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="email"
                name="email"
                onChange={handlechange}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock
                className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="password"
                name="password"
                onChange={handlechange}
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Login Button */}
            <button
              onClick={handlelogin}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-800 transition duration-300 text-lg tracking-wide"
            >
              Log In
            </button>
          </div>

          {/* Additional Links */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <a href="#" className="hover:underline text-blue-500">
              Forgot Password?
            </a>
            <span>
              Don’t have an account?{" "}
              <a
                href="/signin"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign Up
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogInPage;
