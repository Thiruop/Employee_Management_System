import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../NavBar";

const blackBlueBtn =
  "px-5 py-2.5 text-base font-medium text-white bg-black rounded shadow-md shadow-blue-500/60 hover:shadow-blue-600/80 transition";

const ViewEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const [employee, setEmployee] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    fetchEmployee();
    fetchProfileImage();
  }, [id, token]);

  /* -------- FETCH EMPLOYEE DATA -------- */
  const fetchEmployee = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/employees/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEmployee(res.data);
    } catch (err) {
      console.error("Failed to fetch employee:", err);
    } finally {
      setLoading(false);
    }
  };

  /* -------- FETCH PROFILE IMAGE -------- */
  const fetchProfileImage = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/employees/${id}/image`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
          validateStatus: () => true, // allow 200 JSON responses
        }
      );

      const contentType = res.headers["content-type"];

      // ✅ If backend sent an image
      if (contentType && contentType.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(res.data);
        setProfileImage(imageUrl);
      }
      // ✅ If backend sent JSON (no image)
      else {
        setProfileImage(null);
      }
    } catch (err) {
      setProfileImage(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-blue-900 overflow-hidden">
      <Navbar />

      <div className="p-8">
        {/* HEADER */}
        <div className="max-w-4xl mx-auto mb-8 flex items-center gap-6">
          {/* PROFILE IMAGE / ICON */}
          <div className="w-24 h-24 rounded-full bg-black/40 border border-white/20 flex items-center justify-center overflow-hidden shadow-lg shadow-blue-900/60">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl text-white">👤</span>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">
              Employee Details
            </h2>
            <p className="text-white/70">View employee information</p>
          </div>
        </div>

        {/* CONTENT */}
        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : !employee ? (
          <p className="text-white text-center">Employee not found</p>
        ) : (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
            {/* NAME */}
            <div>
              <p className="text-sm text-white/60">Full Name</p>
              <p className="font-medium">{employee.name}</p>
            </div>

            {/* EMAIL */}
            <div>
              <p className="text-sm text-white/60">Email</p>
              <p className="font-medium">{employee.email}</p>
            </div>

            {/* PHONE */}
            <div>
              <p className="text-sm text-white/60">Phone</p>
              <p className="font-medium">{employee.phone}</p>
            </div>

            {/* DESIGNATION */}
            <div>
              <p className="text-sm text-white/60">Designation</p>
              <p className="font-medium">{employee.designation}</p>
            </div>

            {/* SALARY */}
            <div>
              <p className="text-sm text-white/60">Salary</p>
              <p className="font-medium">
                ₹{employee.salary?.toLocaleString("en-IN")}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="md:col-span-2 flex justify-end gap-4 pt-6">
              <button onClick={() => navigate(-1)} className={blackBlueBtn}>
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewEmployee;
