import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "./DeleteDialog";
import DataTable from "./DataTable";

const blackBlueBtn =
  "px-3 py-1 text-sm text-white bg-black rounded shadow-md shadow-blue-500/60 hover:shadow-blue-600/80 disabled:opacity-50 transition";

const EmployeesTable = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  const [employees, setEmployees] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const itemsPerPage = 10;

  useEffect(() => {
    if (!token) return;
    fetchEmployees();
  }, [token, currentPage, search]);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/employees`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { page: currentPage, limit: itemsPerPage, search },
        }
      );
      setEmployees(res.data.employees);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleDelete = (emp) => {
    setSelectedEmployee(emp);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/employees/${
          selectedEmployee._id
        }`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowDeleteDialog(false);
      setSelectedEmployee(null);
      fetchEmployees();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-blue-900 p-6">
      {/* HEADER */}
      <div className="w-full flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Employees</h3>
          <p className="text-white/70">Overview of employee details.</p>
        </div>

        <input
          className="bg-white/90 h-10 px-3 rounded text-sm focus:outline-none"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* TABLE */}
      <div className="rounded-lg border border-white/20 backdrop-blur-sm overflow-hidden">
        <DataTable
          data={employees}
          role={role}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onView={(emp) => navigate(`/dashboard/employees/${emp._id}`)}
          onEdit={(emp) => navigate(`/dashboard/employees/edit/${emp._id}`)}
          onDelete={handleDelete}
        />

        {/* PAGINATION */}
        <div className="flex justify-between items-center px-4 py-3">
          <p className="text-sm text-white/80">
            Showing{" "}
            <b>
              {(currentPage - 1) * itemsPerPage + 1}–
              {Math.min(currentPage * itemsPerPage, total)}
            </b>{" "}
            of {total}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className={blackBlueBtn}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`${blackBlueBtn} ${
                  currentPage === i + 1 ? "shadow-blue-600/90" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
              className={blackBlueBtn}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* DELETE DIALOG */}
      <DeleteDialog
        open={showDeleteDialog}
        title="Delete Employee"
        message={`Are you sure you want to delete "${selectedEmployee?.name}"? This action cannot be undone.`}
        onCancel={() => {
          setShowDeleteDialog(false);
          setSelectedEmployee(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default EmployeesTable;
