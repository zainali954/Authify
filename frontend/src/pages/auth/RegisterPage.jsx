import React, { useState } from 'react';
import Input from '../../components/shared/Input';
import toast from 'react-hot-toast'
import useAuth from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import useLoading from '../../contexts/loadingContext';
import useGoogleAuth from '../../utils/useGoogleAuth';

const RegisterPage = () => {
  const navigate = useNavigate()
  const { loading } = useLoading()
  const { Register } = useAuth()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!loading) {
      const { success, message } = await Register(name, email, password)
      if (success) {
        toast.success(message)
        navigate('/verify-email')
      } else {
        toast.error(message)
      }
    }
  }


  const { loginWithGoogle } = useGoogleAuth();

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
            onChange={(e) => { setName(e.target.value) }}
          />
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

        <button
          onClick={loginWithGoogle}
          className="flex items-center justify-center px-6 py-3 mt-4 w-full bg-zinc-950 text-white rounded-lg shadow-md hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-green-500 hover:ring-2 hover:ring-green-300 transition duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-brand-google mr-3">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" />
          </svg>
          {/* <FcGoogle size={24}  /> */}
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
