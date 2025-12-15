import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";

const EmployeeImage = ({ employeeId }) => {
  const token = Cookies.get("token");
  const fileRef = useRef(null);

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ---------- FETCH IMAGE ---------- */
  useEffect(() => {
    fetchImage();
    // eslint-disable-next-line
  }, [employeeId]);

  const fetchImage = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/employees/${employeeId}/image`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
          validateStatus: () => true,
        }
      );

      const type = res.headers["content-type"];
      if (type && type.startsWith("image/")) {
        setImage(URL.createObjectURL(res.data));
      } else {
        setImage(null);
      }
    } catch {
      setImage(null);
    }
  };

  /* ---------- UPDATE IMAGE ---------- */
  const handleUpdate = () => {
    fileRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setImage(preview);

    const fd = new FormData();
    fd.append("image", file);

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/employees/${employeeId}/image`,
        fd,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch {
      alert("Image upload failed");
      fetchImage();
    } finally {
      setLoading(false);
    }
  };

  /* ---------- DELETE IMAGE ---------- */
  const handleDelete = async () => {
    if (!window.confirm("Remove profile image?")) return;

    try {
      setLoading(true);
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/employees/${employeeId}/image`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setImage(null);
    } catch {
      alert("Failed to delete image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-6">
      {/* IMAGE */}
      <div className="w-24 h-24 rounded-full bg-black/40 border border-white/20 flex items-center justify-center overflow-hidden shadow-lg shadow-blue-900/60">
        {image ? (
          <img src={image} className="w-full h-full object-cover" />
        ) : (
          <span className="text-4xl text-white">👤</span>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col gap-2">
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="px-4 py-1 text-sm text-white bg-black rounded shadow-md shadow-blue-500/60 hover:shadow-blue-600/80 transition disabled:opacity-50"
        >
          Update
        </button>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-4 py-1 text-sm text-white bg-red-600 rounded shadow-md shadow-red-600/60 hover:bg-red-700 transition disabled:opacity-50"
        >
          Delete
        </button>
      </div>

      {/* HIDDEN INPUT */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default EmployeeImage;
