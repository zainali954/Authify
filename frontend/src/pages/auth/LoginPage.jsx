import React, { useState } from 'react'
import Input from '../../components/shared/Input';

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit= (e) => {
    e.preventDefault()
    console.log({
      email,
      password
    })
  }
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
