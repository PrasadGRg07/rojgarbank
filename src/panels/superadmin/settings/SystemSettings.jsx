import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import SaveIcon from "@mui/icons-material/Save";

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    siteName: "Rojgar Bank",
    siteEmail: "admin@rojgarbank.com",
    maintenanceMode: false,
    registration: true,
    emailNotification: true,
    smsNotification: false,
    jobApproval: true,
    darkMode: false,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(settings);

    // API Call
    // await api.put("/superadmin/settings/", settings);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">

        <SettingsIcon sx={{ fontSize: 40 }} className="text-blue-600" />

        <div>

          <h1 className="text-3xl font-bold">
            System Settings
          </h1>

          <p className="text-gray-500">
            Configure application settings.
          </p>

        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* General Settings */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-5">
            General Settings
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="block mb-2 font-medium">
                Website Name
              </label>

              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Admin Email
              </label>

              <input
                type="email"
                name="siteEmail"
                value={settings.siteEmail}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

            </div>

          </div>

        </div>

        {/* System Options */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-5">
            System Options
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <label className="flex justify-between items-center border rounded-lg p-4">

              Maintenance Mode

              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
              />

            </label>

            <label className="flex justify-between items-center border rounded-lg p-4">

              Allow Registration

              <input
                type="checkbox"
                name="registration"
                checked={settings.registration}
                onChange={handleChange}
              />

            </label>

            <label className="flex justify-between items-center border rounded-lg p-4">

              Email Notifications

              <input
                type="checkbox"
                name="emailNotification"
                checked={settings.emailNotification}
                onChange={handleChange}
              />

            </label>

            <label className="flex justify-between items-center border rounded-lg p-4">

              SMS Notifications

              <input
                type="checkbox"
                name="smsNotification"
                checked={settings.smsNotification}
                onChange={handleChange}
              />

            </label>

            <label className="flex justify-between items-center border rounded-lg p-4">

              Auto Approve Jobs

              <input
                type="checkbox"
                name="jobApproval"
                checked={settings.jobApproval}
                onChange={handleChange}
              />

            </label>

            <label className="flex justify-between items-center border rounded-lg p-4">

              Dark Mode

              <input
                type="checkbox"
                name="darkMode"
                checked={settings.darkMode}
                onChange={handleChange}
              />

            </label>

          </div>

        </div>

        {/* Security */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-5">
            Security Settings
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="block mb-2 font-medium">
                Session Timeout (Minutes)
              </label>

              <input
                type="number"
                defaultValue={30}
                className="w-full border rounded-lg p-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Maximum Login Attempts
              </label>

              <input
                type="number"
                defaultValue={5}
                className="w-full border rounded-lg p-3"
              />

            </div>

          </div>

        </div>

        {/* Save */}

        <div>

          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >

            <SaveIcon />

            Save Settings

          </button>

        </div>

      </form>

    </div>
  );
};

export default SystemSettings;