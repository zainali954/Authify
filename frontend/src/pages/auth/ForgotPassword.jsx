import React, { useState } from 'react'
import Input from '../../components/shared/Input'
import useAuth from '../../contexts/authContext'
import toast from 'react-hot-toast'
import useLoading from '../../contexts/loadingContext'

const ForgotPassword = () => {
  const { loading } = useLoading()
  const { ForgotPassword } = useAuth()
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
   if(!loading){
    const { success, message } = await ForgotPassword(email)
    if(success){
      toast.success(message)
    }else{
      toast.error(message)
    }
   }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200">Forgot Password</h2>
        <p className="text-center text-gray-500 mt-2">Enter your email to receive a password reset link.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
