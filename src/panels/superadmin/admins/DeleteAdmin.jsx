import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteAdmin = () => {

  const navigate = useNavigate();

  const { id } = useParams();

  const handleDelete = () => {

    // DELETE API

    console.log("Delete", id);

    navigate("/superadmin/admins");

  };

  return (

    <div className="p-6">

      <div className="bg-white rounded-xl shadow p-6 max-w-md">

        <h2 className="text-2xl font-bold text-red-600">
          Delete Admin
        </h2>

        <p className="mt-4">
          Are you sure you want to delete this admin?
        </p>

        <div className="flex gap-4 mt-6">

          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-5 py-2 rounded"
          >
            Delete
          </button>

          <button
            onClick={() => navigate("/superadmin/admins")}
            className="bg-gray-500 text-white px-5 py-2 rounded"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>

  );

};

export default DeleteAdmin;