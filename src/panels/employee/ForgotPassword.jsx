import React, { useState } from 'react'
import Navbar from "../../components/Navbar";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, LogIn, KeyRound } from 'lucide-react'
import api from "../../lib/api";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [input, setInput] = useState({
        email: '',
        otp: '',
        new_password: '',
        confirm_password: ''
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        setError("");
        setMessage("");
    }

    const handleSendEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");
        
        try {
            const res = await api.post("/auth/forgot-password/", { email: input.email });
            setMessage(res.data.detail || "OTP sent to your email.");
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.detail || "Failed to send OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");
        
        try {
            const res = await api.post("/auth/verify-password-otp/", { email: input.email, otp: input.otp });
            setMessage(""); // Clear message, OTP is good, proceed to set new password
            setStep(3);
        } catch (err) {
            setError(err.response?.data?.detail || "Invalid OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (input.new_password !== input.confirm_password) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        setError("");
        setMessage("");
        
        try {
            const res = await api.post("/auth/reset-password/", {
                email: input.email,
                otp: input.otp,
                new_password: input.new_password,
                confirm_password: input.confirm_password
            });
            setMessage(res.data.detail || "Password reset successful.");
            setTimeout(() => {
                navigate("/employee/login");
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.detail || "Failed to reset password.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-sky-50">
            <Navbar />

            <div className="flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                        <div className="text-center mb-8">
                            <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <KeyRound className="w-7 h-7 text-cyan-600" />
                            </div>
                            <h1 className="text-4xl font-bold text-gray-800">Forgot Password?</h1>
                            <p className="text-sm text-gray-500 mt-1">
                                {step === 1 && "Enter your email to reset your password"}
                                {step === 2 && "Enter the OTP sent to your email"}
                                {step === 3 && "Enter your new password"}
                            </p>
                        </div>

                        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl">{error}</div>}
                        {message && <div className="mb-4 p-3 bg-green-50 text-green-600 text-sm rounded-xl">{message}</div>}

                        <form onSubmit={step === 1 ? handleSendEmail : step === 2 ? handleVerifyOTP : handleResetPassword} className="flex flex-col gap-5">
                            
                            {step === 1 && (
                                <div className="flex flex-col gap-1.5">
                                    <Label className="text-sm font-medium text-gray-700">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            type="email"
                                            onChange={changeEventHandler}
                                            name="email"
                                            value={input.email}
                                            required
                                            placeholder="xyz@gmail.com"
                                            className="pl-10 rounded-xl border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="flex flex-col gap-1.5">
                                    <Label className="text-sm font-medium text-gray-700">OTP</Label>
                                    <Input
                                        type="text"
                                        onChange={changeEventHandler}
                                        name="otp"
                                        value={input.otp}
                                        required
                                        placeholder="Enter 6-digit OTP"
                                        className="rounded-xl border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
                                    />
                                </div>
                            )}

                            {step === 3 && (
                                <>
                                    <div className="flex flex-col gap-1.5">
                                        <Label className="text-sm font-medium text-gray-700">New Password</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input
                                                type="password"
                                                onChange={changeEventHandler}
                                                name="new_password"
                                                value={input.new_password}
                                                required
                                                placeholder="••••••••"
                                                className="pl-10 rounded-xl border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <Label className="text-sm font-medium text-gray-700">Confirm Password</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input
                                                type="password"
                                                onChange={changeEventHandler}
                                                name="confirm_password"
                                                value={input.confirm_password}
                                                required
                                                placeholder="••••••••"
                                                className="pl-10 rounded-xl border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2.5 rounded-xl transition-colors duration-200 mt-1"
                            >
                                {loading ? "Processing..." : (step === 1 ? "Send OTP Email" : step === 2 ? "Verify OTP" : "Reset Password")}
                            </Button>

                            <Link to="/employee/login" className="text-cyan-600 font-normal text-center mt-4 hover:underline">
                               ← Back to Login
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;