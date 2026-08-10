import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Check } from "lucide-react";
import { getAccountSettings, updateAccountSettings } from "../../../lib/jobseekerApi";
import { useAuth } from "../../../context/AuthContext";

const FIELDS = [
  { name: "firstName", label: "First Name", icon: User, type: "text" },
  { name: "lastName", label: "Last Name", icon: User, type: "text" },
  { name: "email", label: "Email", icon: Mail, type: "email" },
  { name: "phone", label: "Phone", icon: Phone, type: "tel" },
  { name: "address", label: "Address", icon: MapPin, type: "text" },
];

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
};

function Field({ name, label, icon: Icon, type, value, onChange }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <Icon
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete="off"
          className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
      </div>
    </div>
  );
}

export default function AccountSettings() {
  const { updateUser } = useAuth();
  const [form, setForm] = useState(INITIAL_STATE);
  const [saved, setSaved] = useState(false);

useEffect(() => {
  fetchAccountSettings();
}, []);

const fetchAccountSettings = async () => {
  try {
    const { data } = await getAccountSettings();

    setForm({
      firstName: data.first_name || "",
      lastName: data.last_name || "",
      email: data.email || "",
      phone: data.phone || "",
      address: data.address || "",
    });
  } catch (error) {
    console.error(error);
  }
};
  const handleChange = (e) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));

  setSaved(false);
};
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await updateAccountSettings({
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      phone: form.phone,
      address: form.address,
    });

    // Sync the name into AuthContext so Header refreshes immediately
    updateUser({
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      name: `${form.firstName} ${form.lastName}`.trim(),
    });

    setSaved(true);
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 md:p-8">
      <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
        Account Settings
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Update your personal information
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {FIELDS.map((field) => (
            <Field
              key={field.name}
              {...field}
              value={form[field.name]}
              onChange={handleChange}
            />
          ))}
        </div>

        <div className="mt-6 flex flex-col-reverse items-center gap-3 sm:flex-row sm:justify-end">
          {saved && (
            <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
              <Check size={16} />
              Changes saved
            </span>
          )}
          <button
            type="submit"
            className="w-full rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 sm:w-auto"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}