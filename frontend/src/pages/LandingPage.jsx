import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-blue-900 text-white flex items-center">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Employee Management System
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            Manage employees, roles, employee details, and performance
            efficiently from a single unified platform.
          </p>

          <ul className="space-y-3 text-gray-300">
            <li>✔ Role-based access control</li>
            <li>✔ View Employee records</li>
            <li>✔ Update Profile</li>
            <li>✔ Secure & scalable system</li>
          </ul>

          <div className="mt-8 flex gap-4">
            <button
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
              onClick={() => navigate("/auth/login")}
            >
              Get Started
            </button>
            <button
              className="px-6 py-3 border border-gray-400 hover:bg-white hover:text-black rounded-lg font-semibold transition"
              onClick={() => navigate("/auth/login")}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Right Content (Optional Card) */}
        <div className="hidden md:block">
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
            <p className="text-gray-300">
              Designed for modern organizations to simplify HR operations and
              improve productivity with real-time insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
