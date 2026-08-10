import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  LogIn,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const EmployerLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const user = await login(input.email, input.password);

      if (user.role === "employee") {
        navigate("/employee/dashboard");
      } else {
        setError("You are not registered as an Employer.");
      }
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-sky-50">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">

          {/* Login Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-7 h-7 text-cyan-600" />
              </div>

              <h1 className="text-2xl font-bold text-gray-800">
                Welcome Back!
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Login to your Employer account
              </p>
            </div>

            {error && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <form
              onSubmit={submitHandler}
              className="flex flex-col gap-5"
            >

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                  <Input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={changeEventHandler}
                    placeholder="company@example.com"
                    className="pl-10 rounded-xl border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-gray-700">
                  Password
                </Label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={input.password}
                    onChange={changeEventHandler}
                    placeholder="••••••••"
                    className="pl-10 pr-10 rounded-xl border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link
                  to="/employee/forgot-password"
                  className="text-sm text-cyan-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>              {/* Login Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2.5 rounded-xl transition-colors duration-200 disabled:opacity-60"
              >
                {loading ? "Signing In..." : "Login"}
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="text-xs text-gray-400">OR</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              {/* Register Link */}
              <p className="text-sm text-center text-gray-500">
                Don't have an employer account?{" "}
                <Link
                  to="/employee/register"
                  className="text-cyan-600 hover:underline font-semibold"
                >
                  Register
                </Link>
              </p>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerLogin;