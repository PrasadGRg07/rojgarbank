import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import api from '../lib/api';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Invalid or missing verification token.');
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await api.post('/auth/verify-email/', { token });
        setStatus('success');
        setMessage(response.data.detail || 'Email verified successfully.');
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.detail || 'Verification failed. The token may be invalid or expired.');
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-sky-50">
      <Navbar />
      
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
          
          {status === 'loading' && (
            <div className="flex flex-col items-center">
              <Loader2 className="w-16 h-16 text-cyan-600 animate-spin mb-4" />
              <h1 className="text-2xl font-bold text-gray-800">Verifying...</h1>
              <p className="text-gray-500 mt-2">{message}</p>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <h1 className="text-2xl font-bold text-gray-800">Email Verified!</h1>
              <p className="text-gray-500 mt-2 mb-6">{message}</p>
              
              <div className="flex flex-col w-full gap-3">
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
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center">
              <XCircle className="w-16 h-16 text-red-500 mb-4" />
              <h1 className="text-2xl font-bold text-gray-800">Verification Failed</h1>
              <p className="text-gray-500 mt-2 mb-6">{message}</p>
              
              <div className="flex flex-col w-full gap-3">
                <Link to="/jobseeker/login">
                  <Button variant="outline" className="w-full">
                    Go to Login
                  </Button>
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
