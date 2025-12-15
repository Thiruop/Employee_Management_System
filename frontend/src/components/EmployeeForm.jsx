import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { showSuccess, showError } from "../scripts/toast";

const blackBlueBtn =
  "px-4 py-2 text-sm font-medium text-white bg-black rounded shadow-md shadow-blue-500/60 hover:shadow-blue-600/80 transition";

const inputClass =
  "w-full h-10 px-3 rounded bg-white/90 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

const errorText = "text-red-400 text-xs mt-1";

const InsertEmployee = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    salary: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only numbers for phone
    if (name === "phone" && !/^\d*$/.test(value)) return;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // clear error while typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    if (!validate()) return;

    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/employees`,
        {
          ...formData,
          salary: Number(formData.salary),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showSuccess("Employee Created Successfully!");

      setTimeout(() => {
        navigate("/dashboard/employees");
      }, 2000);
    } catch (err) {
      console.error("Insert failed:", err);
      showError("Failed to add employee" || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-blue-900 p-8 overflow-hidden">
      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-8">
        <h2 className="text-2xl font-semibold text-white">Add Employee</h2>
        <p className="text-white/70">Enter employee details below</p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* NAME */}
        <div>
          <label className="block text-sm text-white mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm text-white mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${inputClass} ${
              errors.email ? "ring-2 ring-red-400" : ""
            }`}
          />
          {errors.email && <p className={errorText}>{errors.email}</p>}
        </div>

        {/* PHONE */}
        <div>
          <label className="block text-sm text-white mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            maxLength="10"
            value={formData.phone}
            onChange={handleChange}
            className={`${inputClass} ${
              errors.phone ? "ring-2 ring-red-400" : ""
            }`}
          />
          {errors.phone && <p className={errorText}>{errors.phone}</p>}
        </div>

        {/* DESIGNATION */}
        <div>
          <label className="block text-sm text-white mb-1">Designation</label>
          <input
            type="text"
            name="designation"
            required
            value={formData.designation}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* SALARY */}
        <div>
          <label className="block text-sm text-white mb-1">Salary</label>
          <input
            type="number"
            name="salary"
            required
            value={formData.salary}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* ACTIONS */}
        <div className="md:col-span-2 flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={blackBlueBtn}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`${blackBlueBtn} ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Saving..." : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsertEmployee;
