import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";

const employers = [
  {
    id: 1,
    company: "ABC Tech Pvt. Ltd.",
    owner: "Ram Sharma",
    email: "abc@gmail.com",
    phone: "9800000000",
    address: "Kathmandu, Nepal",
    pan: "123456789",
    registration: "REG-2025-001",
    license: "Business License.pdf",
    status: "Pending",
  },
  {
    id: 2,
    company: "XYZ Nepal",
    owner: "Hari KC",
    email: "xyz@gmail.com",
    phone: "9811111111",
    address: "Pokhara, Nepal",
    pan: "987654321",
    registration: "REG-2025-002",
    license: "Business License.pdf",
    status: "Approved",
  },
];

export default function EmployerReview() {
  const { id } = useParams();

  const employer = employers.find((e) => e.id === Number(id));

  if (!employer) {
    return (
      <div className="text-center mt-20 text-xl font-semibold">
        Employer not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Heading */}

      <div>
        <h1 className="text-3xl font-bold">
          Employer Verification
        </h1>

        <p className="text-gray-500">
          Review employer registration before approval.
        </p>
      </div>

      {/* Company Information */}

      <div className="bg-white rounded-xl shadow border p-6">

        <div className="flex items-center justify-between">

          <h2 className="text-xl font-semibold">
            Company Information
          </h2>

          <Badge>{employer.status}</Badge>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">

          <Info
            icon={<Building2 size={18} />}
            label="Company"
            value={employer.company}
          />

          <Info
            icon={<User size={18} />}
            label="Owner"
            value={employer.owner}
          />

          <Info
            icon={<Mail size={18} />}
            label="Email"
            value={employer.email}
          />

          <Info
            icon={<Phone size={18} />}
            label="Phone"
            value={employer.phone}
          />

          <Info
            icon={<MapPin size={18} />}
            label="Address"
            value={employer.address}
          />

          <Info
            icon={<FileText size={18} />}
            label="PAN Number"
            value={employer.pan}
          />

          <Info
            icon={<FileText size={18} />}
            label="Registration No."
            value={employer.registration}
          />

        </div>

      </div>

      {/* Documents */}

      <div className="bg-white rounded-xl shadow border p-6">

        <h2 className="text-xl font-semibold mb-5">
          Uploaded Documents
        </h2>

        <div className="space-y-4">

          <DocumentCard title="PAN Card" />

          <DocumentCard title="Registration Certificate" />

          <DocumentCard title={employer.license} />

        </div>

      </div>

      {/* Actions */}

      <div className="flex gap-4">

        <Button className="bg-green-600 hover:bg-green-700">

          <CheckCircle className="mr-2 h-4 w-4" />

          Approve Employer

        </Button>

        <Button variant="destructive">

          <XCircle className="mr-2 h-4 w-4" />

          Reject Employer

        </Button>

      </div>

    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex gap-3">

      <div className="text-blue-600 mt-1">
        {icon}
      </div>

      <div>

        <p className="text-sm text-gray-500">
          {label}
        </p>

        <p className="font-semibold">
          {value}
        </p>

      </div>

    </div>
  );
}

function DocumentCard({ title }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">

      <div className="flex items-center gap-3">

        <FileText className="text-blue-600" />

        <span>{title}</span>

      </div>

      <Button variant="outline">
        View
      </Button>

    </div>
  );
}