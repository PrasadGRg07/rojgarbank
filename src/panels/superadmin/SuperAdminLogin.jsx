import { useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function SuperAdminLogin() {
  const navigate = useNavigate();
  const { superAdminLogin } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await superAdminLogin(
        formData.username,
        formData.password
      );

      navigate("/superadmin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid username or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-purple-700">
            Super Admin Login
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to continue
          </p>

        </div>

        {error && (
          <div className="bg-red-100 text-red-600 rounded-lg p-3 mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}

          <div>

            <label className="text-sm font-medium">
              Username
            </label>

            <div className="relative mt-1">

              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />

              <input
                name="username"
                type="text"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                required
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="text-sm font-medium">
              Password
            </label>

            <div className="relative mt-1">

              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />

              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-lg pl-10 pr-12 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                required
              />

              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
}