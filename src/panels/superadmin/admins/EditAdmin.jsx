import React from "react";
import { useParams } from "react-router-dom";

const EditAdmin = () => {

  const { id } = useParams();

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Edit Admin #{id}
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <p>
          Load admin details here from backend and allow updating.
        </p>

      </div>

    </div>

  );

};

export default EditAdmin;