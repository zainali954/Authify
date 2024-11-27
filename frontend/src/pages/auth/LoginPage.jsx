import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Input from '../../components/shared/Input';
import useAuth from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import useLoading from '../../contexts/loadingContext';

const LoginPage = () => {
  const { loading } = useLoading()
  const { Login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loading) {
      const { success, message, role } = await Login(email, password); // Get login response

      if (success) {
        toast.success(message); 

        // Redirect based on role
        if (role && role.toLowerCase() === "admin") {
          navigate('/admin/dashboard');
        } else if (role && role.toLowerCase() === "user") {
          navigate('/user/dashboard'); 
        } else {
          toast.error("Unexpected role!");
        }
      } else {
        toast.error(message); 
      }
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-zinc-800  border border-gray-200 dark:border-zinc-700 shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200">Login</h2>
        <p className="text-center text-gray-500 mt-2">Access your account to continue.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <p className=" text-gray-600 mt-4">
            <a href="/forgot-password" className="text-green-500 hover:underline">Forgot password ?</a>
          </p>
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition duration-200"
          >
            Login Now
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="/register" className="text-green-500 hover:underline">Register</a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
