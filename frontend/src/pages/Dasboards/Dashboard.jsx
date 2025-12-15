import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Navbar from "../NavBar";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  const [employees, setEmployees] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [designationChart, setDesignationChart] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetchEmployees();
  }, [token]);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/employees`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const empList = res.data.employees || [];
      setEmployees(empList);
      setTotalEmployees(res.data.total || empList.length);

      // Count employees by designation
      const designationCount = empList.reduce((acc, emp) => {
        const key = emp.designation || "Unknown";
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      const chartData = Object.entries(designationCount).map(
        ([designation, count]) => ({
          designation,
          count,
        })
      );

      setDesignationChart(chartData);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-blue-900">
      <Navbar />

      <div className="p-8 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>

          {role === "admin" && (
            <button
              onClick={() => navigate("/dashboard/employees/add")}
              className="px-5 py-2 rounded bg-black text-white
                         shadow-lg shadow-blue-500/60
                         hover:shadow-blue-500 transition"
            >
              + Add Employee
            </button>
          )}
        </div>

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* TOTAL EMPLOYEES */}
          <div className="p-6 rounded-xl bg-black/40 border border-white/20 shadow-lg shadow-blue-900/60">
            <p className="text-white/70 text-sm">Total Employees</p>
            <p className="text-4xl font-bold text-white mt-2">
              {totalEmployees}
            </p>
          </div>

          {/* EMPLOYEES BY DESIGNATION */}
          <div className="p-6 rounded-xl bg-black/40 border border-white/20 shadow-lg shadow-blue-900/60">
            <p className="text-white/70 text-sm mb-4">
              Employees by Designation
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {designationChart.map((item) => (
                <div
                  key={item.designation}
                  className="p-4 rounded-lg bg-black/50
                             border border-white/10
                             shadow-md shadow-blue-900/40"
                >
                  <p className="text-white/60 text-xs mb-1">Designation</p>
                  <p className="text-white font-semibold text-sm truncate">
                    {item.designation}
                  </p>

                  <p className="text-white text-2xl font-bold mt-2">
                    {item.count}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FULL WIDTH GRAPH */}
        <div className="w-full p-6 rounded-xl bg-black/40 border border-white/20 shadow-lg shadow-blue-900/60">
          <p className="text-white/70 text-sm mb-4">Designation Distribution</p>

          <div className="w-full h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={designationChart}>
                <XAxis
                  dataKey="designation"
                  stroke="#ffffff80"
                  tick={{ fill: "#ffffff80", fontSize: 12 }}
                />
                <YAxis
                  stroke="#ffffff80"
                  tick={{ fill: "#ffffff80", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#000",
                    border: "1px solid #3b82f6",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
