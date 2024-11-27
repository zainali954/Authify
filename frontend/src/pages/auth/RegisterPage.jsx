import React, { useState } from 'react';
import Input from '../../components/shared/Input';
import toast from 'react-hot-toast'
import useAuth from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import useLoading from '../../contexts/loadingContext';

const RegisterPage = () => {
  const navigate = useNavigate()
  const { loading } = useLoading()
  const { Register} = useAuth()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit= async (e) => {
    e.preventDefault()
    if(!loading){
      const { success, message } = await Register(name, email, password)
      if(success){
        toast.success(message)
        navigate('/verify-email')
      }else{
        toast.error(message)
      }
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-zinc-800  border border-gray-200 dark:border-zinc-700 shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200">Sign Up</h2>
        <p className="text-center text-gray-500 mt-2">Create your account to get started</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
          />
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition duration-200"
            disabled={loading}
          >
            Register Now
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-green-500 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
