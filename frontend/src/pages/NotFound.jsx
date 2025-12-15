import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-black to-blue-900 text-white">
      <h1 className="text-7xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page Not Found</p>

      <button
        onClick={() => navigate("/dashboard")}
        className="px-6 py-2 bg-black text-white rounded shadow-[0_0_10px_#3b82f6]"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default NotFound;
