import React from "react";

const blackBlueBtn =
  "px-3 py-1 text-sm font-medium text-white bg-black rounded shadow-md shadow-blue-500/60 hover:shadow-blue-600/80 transition";

const DataTable = ({
  data = [],
  role,
  currentPage,
  itemsPerPage,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <table className="w-full text-left table-auto min-w-max bg-transparent">
      {/* HEADER */}
      <thead>
        <tr>
          {[
            "#",
            "Name",
            "Email",
            "Phone",
            "Designation",
            "Salary",
            "Actions",
          ].map((head) => (
            <th key={head} className="p-4 border-b border-white/30">
              <p className="text-sm font-normal text-white">{head}</p>
            </th>
          ))}
        </tr>
      </thead>

      {/* BODY */}
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan="7" className="p-6 text-center text-white/70">
              No employees found
            </td>
          </tr>
        ) : (
          data.map((emp, index) => (
            <tr
              key={emp._id}
              className="hover:bg-white/5 border-b border-white/20"
            >
              <td className="p-4 py-5 text-white">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>

              <td className="p-4 py-5 font-semibold text-white">{emp.name}</td>

              <td className="p-4 py-5 text-white/80">{emp.email}</td>

              <td className="p-4 py-5 text-white/80">{emp.phone}</td>

              <td className="p-4 py-5 text-white/80">{emp.designation}</td>

              <td className="p-4 py-5 text-white/80">
                ₹{emp.salary.toLocaleString("en-IN")}
              </td>

              {/* ACTIONS */}
              <td className="p-4 py-5 space-x-2">
                <button onClick={() => onView(emp)} className={blackBlueBtn}>
                  View
                </button>

                {role === "admin" && (
                  <>
                    <button
                      onClick={() => onEdit(emp)}
                      className={blackBlueBtn}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(emp)}
                      className={blackBlueBtn}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default DataTable;
