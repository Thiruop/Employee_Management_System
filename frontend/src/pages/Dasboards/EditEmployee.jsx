import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../NavBar";
import EmployeeImage from "../../components/EmployeeImage";

const blackBlueBtn =
  "px-4 py-2 text-sm font-medium text-white bg-black rounded shadow-md shadow-blue-500/60 hover:shadow-blue-600/80 transition";

const inputClass =
  "w-full h-10 px-3 rounded bg-white/90 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

const errorText = "text-red-400 text-xs mt-1";

const EditEmployee = () => {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  /* ---------------- FETCH EMPLOYEE ---------------- */
  useEffect(() => {
    if (!token) return;

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          designation: res.data.designation || "",
          salary: res.data.salary || "",
        });
      })
      .catch(() => {
        alert("Failed to load employee");
        navigate(-1);
      })
      .finally(() => setLoading(false));
  }, [id, token, navigate]);

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const newErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- INPUT HANDLER ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // allow only digits for phone
    if (name === "phone" && !/^\d*$/.test(value)) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /* ---------------- UPDATE ---------------- */
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setUpdating(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/employees/${id}`,
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

      navigate("/dashboard/employees");
    } catch {
      alert("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-black to-blue-900 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-blue-900 overflow-hidden">
      <Navbar />

      <div className="p-8">
        {/* HEADER */}
        <div className="max-w-4xl mx-auto mb-8">
          <h2 className="text-2xl font-semibold text-white">Edit Employee</h2>
          <p className="text-white/70">Update employee details</p>
        </div>

        {/* PROFILE IMAGE (SEPARATE COMPONENT) */}
        <div className="max-w-4xl mx-auto mb-8">
          <EmployeeImage employeeId={id} />
        </div>

        {/* FORM */}
        <form
          onSubmit={handleUpdate}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* NAME */}
          <div>
            <label className="block text-sm text-white mb-1">Full Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm text-white mb-1">Email</label>
            <input
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
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* SALARY */}
          <div>
            <label className="block text-sm text-white mb-1">Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* ACTIONS */}
          <div className="md:col-span-2 flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={blackBlueBtn}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updating}
              className={`${blackBlueBtn} ${
                updating ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {updating ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
