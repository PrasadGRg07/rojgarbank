import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';
import { CheckCircle, XCircle, Loader2, Mail, RefreshCw } from 'lucide-react';
import api from '../lib/api';

const OTPVerify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get('email') || '';
  const role = searchParams.get('role') || '';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [message, setMessage] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef([]);

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleChange = (index, value) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(''));
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length < 6) {
      setMessage('Please enter the complete 6-digit OTP.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await api.post('/auth/verify-otp/', { email, otp: otpString });
      setStatus('success');
      setMessage(response.data.detail || 'Email verified successfully!');
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.detail || 'Verification failed. Please try again.');
      // Reset OTP on error
      setOtp(['', '', '', '', '', '']);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setResendLoading(true);
    setMessage('');
    try {
      await api.post('/auth/resend-otp/', { email });
      setResendCooldown(60);
      setStatus('idle');
      setOtp(['', '', '', '', '', '']);
      setMessage('A new OTP has been sent to your email.');
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch (err) {
      setMessage(err.response?.data?.detail || 'Failed to resend OTP. Please try again.');
      setStatus('error');
    } finally {
      setResendLoading(false);
    }
  };

  const maskedEmail = email
    ? email.replace(/(.{2})(.*)(?=@)/, (_, a, b) => a + b.replace(/./g, '*'))
    : 'your email';

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-sky-50">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">

            {status !== 'success' ? (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-cyan-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-cyan-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800">Verify Your Email</h1>
                  <p className="text-sm text-gray-500 mt-2">
                    We sent a 6-digit code to <br />
                    <span className="font-semibold text-gray-700">{maskedEmail}</span>
                  </p>
                </div>

                {/* Error / Info Messages */}
                {message && (
                  <div className={`mb-5 text-sm rounded-xl px-4 py-3 ${
                    status === 'error'
                      ? 'text-red-600 bg-red-50 border border-red-100'
                      : 'text-green-700 bg-green-50 border border-green-100'
                  }`}>
                    {message}
                  </div>
                )}

                {/* OTP Input */}
                <form onSubmit={handleSubmit}>
                  <div className="flex justify-center gap-3 mb-8" onPaste={handlePaste}>
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={el => inputRefs.current[index] = el}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={e => handleChange(index, e.target.value)}
                        onKeyDown={e => handleKeyDown(index, e)}
                        className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-xl outline-none transition-all duration-200
                          ${digit ? 'border-cyan-500 bg-cyan-50 text-cyan-700' : 'border-gray-200 text-gray-800'}
                          focus:border-cyan-500 focus:bg-cyan-50
                        `}
                      />
                    ))}
                  </div>

                  <Button
                    type="submit"
                    disabled={status === 'loading' || otp.join('').length < 6}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2.5 rounded-xl transition-colors duration-200 disabled:opacity-60"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
                      </span>
                    ) : 'Verify Account'}
                  </Button>
                </form>

                {/* Resend */}
                <div className="text-center mt-6">
                  <p className="text-sm text-gray-500">Didn't receive a code?</p>
                  <button
                    onClick={handleResend}
                    disabled={resendLoading || resendCooldown > 0}
                    className="mt-1 text-sm font-semibold text-cyan-600 hover:text-cyan-800 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center gap-1 mx-auto transition-colors"
                  >
                    {resendLoading ? (
                      <><Loader2 className="w-3 h-3 animate-spin" /> Sending...</>
                    ) : resendCooldown > 0 ? (
                      `Resend in ${resendCooldown}s`
                    ) : (
                      <><RefreshCw className="w-3 h-3" /> Resend OTP</>
                    )}
                  </button>
                </div>

                {/* Back to register */}
                <p className="text-sm text-center text-gray-400 mt-6">
                  Wrong email?{' '}
                  <Link to="/jobseeker/register" className="text-cyan-600 hover:underline">
                    Go back
                  </Link>
                </p>
              </>
            ) : (
              /* Success State */
              <div className="flex flex-col items-center text-center py-4">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h1 className="text-2xl font-bold text-gray-800">Email Verified!</h1>
                <p className="text-gray-500 mt-2 mb-8">{message}</p>

                <div className="flex flex-col w-full gap-3">
                  {role === 'employee' ? (
                    <Link to="/employee/login">
                      <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                        Continue to Login
                      </Button>
                    </Link>
                  ) : role === 'jobseeker' ? (
                    <Link to="/jobseeker/login">
                      <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                        Continue to Login
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link to="/jobseeker/login">
                        <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                          Continue as Job Seeker
                        </Button>
                      </Link>
                      <Link to="/employee/login">
                        <Button variant="outline" className="w-full">
                          Continue as Employer
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerify;
