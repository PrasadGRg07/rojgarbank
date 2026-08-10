import React, { useState } from 'react'
import Navbar from './Navbar'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { RadioGroup } from './ui/radio-group'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { Mail, Lock, User, Phone, ImagePlus, UserPlus } from 'lucide-react'

const Register = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
    fullname: '',
    file: '',
    phonenumber: '',
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
  }

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

            <form onSubmit={submitHandler} className="flex flex-col gap-4">

              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-gray-700">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    value={input.fullname}
                    onChange={changeEventHandler}
                    name="fullname"
                    placeholder="Enter your name"
                    className="pl-10 rounded-xl border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-gray-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="email"
                    value={input.email}
                    onChange={changeEventHandler}
                    name="email"
                    placeholder="xyz@abc.com"
                    className="pl-10 rounded-xl border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-gray-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="password"
                    value={input.password}
                    onChange={changeEventHandler}
                    name="password"
                    placeholder="••••••••••"
                    className="pl-10 rounded-xl border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
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
                    value={input.phonenumber}
                    onChange={changeEventHandler}
                    name="phonenumber"
                    placeholder="+977-1234567890"
                    className="pl-10 rounded-xl border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
                  />
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
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2.5 rounded-xl transition-colors duration-200 mt-1"
              >
                Register
              </Button>

              {/* Login link */}
              <p className="text-sm text-center text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="text-cyan-600 hover:underline font-semibold">
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