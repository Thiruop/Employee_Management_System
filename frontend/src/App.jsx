import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Authentication/Login";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Authentication/Register";
import Dashboard from "./pages/Dasboards/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";

import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EmployeeDetails from "./pages/Dasboards/EmployeeDetails";
import InsertEmployees from "./pages/Dasboards/InsertEmployees";
import ViewEmployee from "./pages/Dasboards/ViewEmployee";
import EditEmployee from "./pages/Dasboards/EditEmployee";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Fragment>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        theme="dark"
        transition={Slide}
      />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* AUTHENTICATED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard">
            <Route index element={<Dashboard />} />
            <Route path="view" element={<Dashboard />} />

            {/* EMPLOYEES */}
            <Route path="employees">
              {/* ADMIN + USER */}
              <Route index element={<EmployeeDetails />} />
              <Route path=":id" element={<ViewEmployee />} />

              {/* ADMIN ONLY */}
              <Route element={<RoleProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="add" element={<InsertEmployees />} />
                <Route path="edit/:id" element={<EditEmployee />} />
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
}

export default App;
