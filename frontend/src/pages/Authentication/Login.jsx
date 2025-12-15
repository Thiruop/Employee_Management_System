import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { showSuccess, showError } from "../../scripts/toast";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/auth/login",
        formData
      );

      const { token, role, username } = res.data;

      // ✅ Store in cookies
      Cookies.set("token", token, {
        expires: 1, // 1 day
        secure: true,
        sameSite: "strict",
      });

      Cookies.set("role", role, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("username", username, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });
      showSuccess("Login successful!");

      setTimeout(() => {
        navigate("/dashboard/view");
      }, 2000);
    } catch (error) {
      showError(
        error.response?.data?.message || "Issue in Login Please Try Agian"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-blue-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-2">
          Employee Management
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Login to access your dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/auth/register")}
            className="text-blue-600 cursor-pointer font-semibold hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
