import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SaveIcon from "@mui/icons-material/Save";
import LockIcon from "@mui/icons-material/Lock";

const Profile = () => {
  const [profile, setProfile] = useState({
    first_name: "Super",
    last_name: "Admin",
    username: "superadmin",
    email: "superadmin@rojgarbank.com",
    phone: "+977 9800000000",
    role: "Super Admin",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log(profile);

    // API Call
    // await api.put("/superadmin/profile/", profile);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (password.new !== password.confirm) {
      alert("Passwords do not match");
      return;
    }

    console.log(password);

    // API Call
    // await api.post("/superadmin/change-password/", password);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        My Profile
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex flex-col items-center">

            <AccountCircleIcon
              sx={{ fontSize: 120 }}
              className="text-blue-600"
            />

            <h2 className="text-2xl font-bold mt-3">
              {profile.first_name} {profile.last_name}
            </h2>

            <p className="text-gray-500">
              {profile.role}
            </p>

          </div>

        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-5">
            Personal Information
          </h2>

          <form
            onSubmit={handleProfileSubmit}
            className="grid md:grid-cols-2 gap-5"
          >

            <div>
              <label className="block mb-2 font-medium">
                First Name
              </label>

              <input
                type="text"
                name="first_name"
                value={profile.first_name}
                onChange={handleProfileChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Last Name
              </label>

              <input
                type="text"
                name="last_name"
                value={profile.last_name}
                onChange={handleProfileChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleProfileChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Role
              </label>

              <input
                type="text"
                value={profile.role}
                disabled
                className="w-full border rounded-lg p-3 bg-gray-100"
              />
            </div>

            <div className="md:col-span-2">

              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                <SaveIcon />
                Save Changes
              </button>

            </div>

          </form>

        </div>

      </div>

      {/* Change Password */}

      <div className="bg-white rounded-xl shadow p-6 mt-6">

        <h2 className="text-xl font-semibold flex items-center gap-2 mb-5">
          <LockIcon />
          Change Password
        </h2>

        <form
          onSubmit={handlePasswordSubmit}
          className="grid md:grid-cols-3 gap-5"
        >

          <input
            type="password"
            name="current"
            placeholder="Current Password"
            value={password.current}
            onChange={handlePasswordChange}
            className="border rounded-lg p-3"
          />

          <input
            type="password"
            name="new"
            placeholder="New Password"
            value={password.new}
            onChange={handlePasswordChange}
            className="border rounded-lg p-3"
          />

          <input
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            value={password.confirm}
            onChange={handlePasswordChange}
            className="border rounded-lg p-3"
          />

          <div className="md:col-span-3">

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              Update Password
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default Profile;