import React, { useState } from 'react';
import Input from '../../components/shared/Input';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../contexts/authContext';
import toast from 'react-hot-toast';
import useLoading from '../../contexts/loadingContext';

const ResetPassword = () => {
  const { loading } = useLoading()
  const { ResetPassword} = useAuth()
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const {token} = useParams();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if(!loading){
      const { success, message } = await ResetPassword(token, newPassword);
      if(success){
        toast.success(message)
        navigate('/login')
      }else{
        toast.error(message)
      }
    }

    // Reset fields after submission
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-slate-100">
      <div className="w-full max-w-md border border-gray-200 dark:border-zinc-700 bg-zinc-800 shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200">Reset Password</h2>
        <p className="text-center text-slate-400 mt-2">Enter your new password below.</p>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <p className=" text-gray-600 mt-4">
            <a href="/forgot-password" className="text-green-500 hover:underline">Request new link ?</a>
          </p>

          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
