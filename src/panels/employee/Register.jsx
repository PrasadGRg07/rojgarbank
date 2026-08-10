import React, { useState } from 'react'
import Navbar from "../../components/Navbar";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Phone, ImagePlus, UserPlus, Eye, EyeOff } from 'lucide-react'
import api from '../../lib/api'

const Register = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    companyname: '',
    email: '',
    phonenumber: '',
    password: '',
    confirmpassword: '',
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState("");

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');

    if (input.password !== input.confirmpassword) {
      setError("Passwords do not match");
      return;
    }
    {success && (
  <div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
    {success}
  </div>
)}

    const username = (input.email.split('@')[0] || '').trim();

    const payload = {
      username,
      company_name: input.companyname,
      email: input.email,
      phone_number: input.phonenumber,
      password: input.password,
      confirm_password: input.confirmpassword,
      role: "employee",
    };

    try {
      setLoading(true);
      const res = await api.post('/auth/register/', payload);
      const data = res.data;
      if (res.status >= 200 && res.status < 300) {
        setSuccess("🎉 Account created successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/employee/login");
        }, 2000);
      } else {
        const firstError = Object.values(data || {})[0];
        setError(Array.isArray(firstError) ? firstError[0] : JSON.stringify(data));
      }
    } catch (err) {
      const backendMessage = err?.response?.data;
      const firstError = backendMessage && Object.values(backendMessage)[0];
      setError(
        Array.isArray(firstError)
          ? firstError[0]
          : typeof backendMessage === 'string'
            ? backendMessage
            : 'Registration failed. Please check your details and try again.'
      );
    } finally {
      setLoading(false);
    }
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-sky-50">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-7 h-7 text-cyan-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
              <p className="text-sm text-gray-500 mt-1">Join Rojgar Bank today</p>
            </div>

            {error && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2">
                {error}
              </div>
            )}

            <form onSubmit={submitHandler} className="flex flex-col gap-4">

              {/* Company Name */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-gray-700">Company Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    value={input.companyname}
                    onChange={changeEventHandler}
                    name="companyname"
                    placeholder="Enter company name"
                    className="pl-10 rounded-xl border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
                    required
                  />
                </div>
              </div>
      

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-gray-700">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="email"
                    value={input.email}
                    onChange={changeEventHandler}
                    name="email"
                    placeholder="xyz@gmail.com"
                    className="pl-10 rounded-xl border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
  type="tel"
  name="phonenumber"
  value={input.phonenumber}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "");
    setInput({ ...input, phonenumber: value });
  }}
  placeholder="9812345678"
  className="pl-10 rounded-xl border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
  maxLength={10}
  required
/>
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-gray-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={input.password}
                    onChange={changeEventHandler}
                    name="password"
                    placeholder="••••••••••"
                    className="pl-10 rounded-xl border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
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

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-gray-700">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={input.confirmpassword}
                    onChange={changeEventHandler}
                    name="confirmpassword"
                    placeholder="••••••••••"
                    className="pl-10 rounded-xl border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                <Label className="text-sm font-medium text-gray-700">Profile Picture</Label>
                <label className="flex items-center gap-3 border-2 border-dashed border-gray-200 hover:border-cyan-400 rounded-xl px-4 py-3 cursor-pointer transition-colors duration-200">
                  <ImagePlus className="w-5 h-5 text-cyan-500 shrink-0" />
                  <span className="text-sm text-gray-500 truncate">
                    {input.file ? input.file.name : 'Click to upload profile picture'}
                  </span>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={changeFileHandler}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2.5 rounded-xl transition-colors duration-200 mt-1 disabled:opacity-60"
              >
                {loading ? 'Creating account...' : 'Register'}
              </Button>

              {/* Login link */}
              <p className="text-sm text-center text-gray-500">
                Already have an account?{' '}
                <Link to="/employee/login" className="text-cyan-600 hover:underline font-semibold">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register