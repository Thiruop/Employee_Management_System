import React from "react";

const blackBlueBtn =
  "px-4 py-2 text-sm font-medium text-white bg-black rounded shadow-md shadow-blue-500/60 hover:shadow-blue-600/80 transition";

const DeleteDialog = ({ open, title, message, onCancel, onConfirm }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
                 bg-black/70 backdrop-blur-sm overflow-hidden"
    >
      {/* DIALOG */}
      <div
        className="w-full max-w-md rounded-xl border border-white/20 
                   bg-gradient-to-r from-black to-blue-900 
                   p-6 shadow-2xl shadow-blue-900/50"
      >
        {/* TITLE */}
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>

        {/* MESSAGE */}
        <p className="text-white/80 mb-6">{message}</p>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">
          {/* CANCEL */}
          <button onClick={onCancel} className={blackBlueBtn}>
            Cancel
          </button>

          {/* DELETE */}
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white 
                       bg-red-600 rounded shadow-md shadow-red-600/60 
                       hover:bg-red-700 hover:shadow-red-700/80 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
