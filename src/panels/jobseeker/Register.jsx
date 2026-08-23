import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Phone,
  ImagePlus,
  FileText,
  UserPlus,
  Eye,
  EyeOff,
} from "lucide-react";
import { GoogleLogin } from '@react-oauth/google';
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

const JobSeekerRegister = () => {
  const navigate = useNavigate();
  const { setAuthSession } = useAuth();

  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmpassword: "",
    profile: null,
    resume: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const profileHandler = (e) => {
    setInput({
      ...input,
      profile: e.target.files[0],
    });
  };

  const resumeHandler = (e) => {
    setInput({
      ...input,
      resume: e.target.files[0],
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setError("");

    if (input.password !== input.confirmpassword) {
      setError("Passwords do not match.");
      return;
    }

    const username = (input.email.split("@")[0] || "").trim();

    const payload = {
      username,
      first_name: input.firstname,
      last_name: input.lastname,
      email: input.email,
      phone_number: input.phonenumber,
        password: input.password,
        confirm_password: input.confirmpassword,
      role: "jobseeker",
    };

    try {
      setLoading(true);

      const res = await api.post("/auth/register/", payload);

      const data = res.data;

      if (res.status >= 200 && res.status < 300) {
        navigate(`/verify-otp?email=${encodeURIComponent(res.data.email || input.email)}&role=jobseeker`);
      }
    } catch (err) {
      const backendMessage = err?.response?.data;
      const firstError =
        backendMessage && Object.values(backendMessage)[0];

      setError(
        Array.isArray(firstError)
          ? firstError[0]
          : typeof backendMessage === "string"
          ? backendMessage
          : "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-sky-50">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">

            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-7 h-7 text-cyan-600" />
              </div>

              <h1 className="text-2xl font-bold text-gray-800">
                Create Job Seeker Account
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Find your dream job with Rojgar Bank
              </p>
            </div>

            {error && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                {success}
              </div>
            )}

            <div className="mb-6 flex flex-col gap-4 items-center">
               <GoogleLogin
                 onSuccess={async (credentialResponse) => {
                   try {
                     setLoading(true);
                     const res = await api.post('/auth/google-login/', { 
                        credential: credentialResponse.credential,
                        role: 'jobseeker'
                     });
                     if (res.status >= 200 && res.status < 300) {
                        setAuthSession(res.data.user, res.data.access, res.data.refresh);
                        setSuccess("🎉 Google login successful!");
                        setTimeout(() => navigate(`/${res.data.user.role}/dashboard`), 2000);
                     }
                   } catch (err) {
                     setError('Google login failed.');
                   } finally {
                     setLoading(false);
                   }
                 }}
                 onError={() => setError('Google login failed.')}
               />
               <div className="relative flex items-center py-2 w-full">
                 <div className="flex-grow border-t border-gray-200"></div>
                 <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">OR</span>
                 <div className="flex-grow border-t border-gray-200"></div>
               </div>
            </div>

            <form
              onSubmit={submitHandler}
              className="flex flex-col gap-4"
            >              {/* First Name */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-gray-700">
                  First Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    name="firstname"
                    value={input.firstname}
                    onChange={changeEventHandler}
                    placeholder="Enter first name"
                    className="pl-10 rounded-xl border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
                    required
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-gray-700">
                  Last Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    name="lastname"
                    value={input.lastname}
                    onChange={changeEventHandler}
                    placeholder="Enter last name"
                    className="pl-10 rounded-xl border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
                    required
                  />
                </div>
              </div>

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
                    placeholder="example@gmail.com"
                    className="pl-10 rounded-xl border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="tel"
                    name="phonenumber"
                    value={input.phonenumber}
                    onChange={changeEventHandler}
                    placeholder="+977 98XXXXXXXX"
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-gray-700">
                  Confirm Password
                </Label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmpassword"
                    value={input.confirmpassword}
                    onChange={changeEventHandler}
                    placeholder="••••••••"
                    className="pl-10 pr-10 rounded-xl border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Profile Picture */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-gray-700">
                  Profile Picture (Optional)
                </Label>

                <label className="flex items-center gap-3 border-2 border-dashed border-gray-200 hover:border-cyan-400 rounded-xl px-4 py-3 cursor-pointer transition">
                  <ImagePlus className="w-5 h-5 text-cyan-500" />

                  <span className="text-sm text-gray-500 truncate">
                    {input.profile
                      ? input.profile.name
                      : "Upload profile picture"}
                  </span>

                  <Input
                    type="file"
                    accept="image/*"
                    onChange={profileHandler}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Resume */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-gray-700">
                  Resume (Optional)
                </Label>

                <label className="flex items-center gap-3 border-2 border-dashed border-gray-200 hover:border-cyan-400 rounded-xl px-4 py-3 cursor-pointer transition">
                  <FileText className="w-5 h-5 text-cyan-500" />

                  <span className="text-sm text-gray-500 truncate">
                    {input.resume
                      ? input.resume.name
                      : "Upload Resume (PDF)"}
                  </span>

                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={resumeHandler}
                    className="hidden"
                  />
                </label>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2.5 rounded-xl mt-2"
              >
                {loading ? "Creating Account..." : "Register"}
                          </Button>              {/* Login Link */}
              <p className="text-sm text-center text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/jobseeker/login"
                  className="text-cyan-600 hover:underline font-semibold"
                >
                  Login
                </Link>
              </p>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerRegister;
      