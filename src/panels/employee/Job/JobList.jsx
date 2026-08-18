import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  Pencil,
  Clock,
  CheckCircle,
  XCircle,
  Trash2,
} from "lucide-react";
import { getMyJobs, deleteJob } from "../../../lib/employeeJobApi";

const STATUS_CONFIG = {
  draft: {
    label: "Draft",
    color: "bg-gray-100 text-gray-700",
    icon: Clock,
  },

  pending: {
    label: "Pending Review",
    color: "bg-yellow-100 text-yellow-700",
    icon: Clock,
  },

  approved: {
    label: "Approved",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },

  rejected: {
    label: "Rejected",
    color: "bg-red-100 text-red-700",
    icon: XCircle,
  },
};
export default function JobList(){

  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchJobs();
}, []);

const fetchJobs = async () => {
  try {
    const data = await getMyJobs();
    console.log(data);
    setJobs(data);

    console.log("Jobs API Response:", data);
    console.log("Is Array?", Array.isArray(data));

    setJobs(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error("Fetch Jobs Error:", error);
  } finally {
    setLoading(false);
  }
};
if (loading) {
  return (
    <div className="p-6">
      Loading jobs...
    </div>
  );
}

const handleDeleteJob = async (id) => {
  if (window.confirm("Are you sure you want to delete this job?")) {
    try {
      await deleteJob(id);
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error("Delete Job Error:", error);
      alert("Failed to delete job.");
    }
  }
};


  return (

    <div className="min-h-screen bg-slate-100 p-6">


      <div className="mx-auto max-w-7xl">


        <div className="mb-8">

          <h1 className="text-3xl font-bold">
            My Job Posts
          </h1>

          <p className="text-slate-500">
            Manage your submitted job postings.
          </p>

        </div>



        <div className="space-y-5">
          {jobs.length === 0 && (
  <div className="rounded-xl bg-white p-8 text-center shadow">
    No jobs found.
  </div>
)}


          {jobs.map((job)=>{


            const status =
              STATUS_CONFIG[job.status || "pending"];


            const StatusIcon =
              status.icon;



            return (

              <div
                key={job.id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >


                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">


                  <div>


                    <h2 className="text-xl font-bold">
                      {job.title}
                    </h2>


                    <p className="mt-2 text-slate-500">
                      {job.company || "Company Name"}
                    </p>


                    <p className="text-sm text-slate-500">
                      {job.location || "Location"}
                    </p>



                    <span
                      className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${status.color}`}
                    >

                      <StatusIcon size={16}/>

                      {status.label}

                    </span>

                    {job.status === "rejected" && job.rejection_reason && (
                      <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        <span className="font-semibold block mb-1">Reason for Rejection:</span>
                        {job.rejection_reason}
                      </div>
                    )}


                  </div>




                  <div className="flex flex-wrap gap-3">

  <button
    onClick={() => 
      navigate(`/employee/dashboard/jobs/${job.id}`)
    }
    className="flex items-center gap-2 rounded-lg border px-4 py-2"
  >
    <Eye size={18}/>
    View
  </button>


  {job.status === "approved" && (
    <button
      onClick={() => 
        navigate(`/employee/dashboard/jobs/applicants/${job.id}`)
      }
      className="flex items-center gap-2 rounded-lg border border-green-600 px-4 py-2 text-green-600"
    >
      <Eye size={18}/>
      Applicants
    </button>
  )}


  <button
    onClick={() => navigate(`/employee/dashboard/jobs/edit/${job.id}`)}
    className="flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-blue-600"
  >
    <Pencil size={18} />
    Edit
  </button>

  <button
    onClick={() => handleDeleteJob(job.id)}
    className="flex items-center gap-2 rounded-lg border border-red-600 px-4 py-2 text-red-600 hover:bg-red-50"
  >
    <Trash2 size={18} />
    Delete
  </button>

</div>


                </div>


              </div>

            );


          })}


        </div>


      </div>


    </div>

  );

}