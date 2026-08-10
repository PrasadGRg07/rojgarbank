import React, { useState } from 'react'
import Navbar from './Navbar'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { RadioGroup } from './ui/radio-group'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { Mail, Lock, LogIn } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
        role: '',
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

            <div className="flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-md">

                    {/* Card */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">

                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <LogIn className="w-7 h-7 text-cyan-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
                            <p className="text-sm text-gray-500 mt-1">Login to your account</p>
                        </div>

                        <form onSubmit={submitHandler} className="flex flex-col gap-5">

                            {/* Email */}
                            <div className="flex flex-col gap-1.5">
                                <Label className="text-sm font-medium text-gray-700">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        type="email"
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
                                        onChange={changeEventHandler}
                                        name="password"
                                        placeholder="••••••••••"
                                        className="pl-10 rounded-xl border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
                                    />
                                </div>
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2.5 rounded-xl transition-colors duration-200 mt-1"
                            >
                                Login
                            </Button>

                            {/* Register link */}
                            <p className="text-sm text-center text-gray-500">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-cyan-600 hover:underline font-semibold">
                                    Register
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login