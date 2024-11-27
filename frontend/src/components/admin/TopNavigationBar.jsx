import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../contexts/authContext';
import useLoading from '../../contexts/loadingContext';

const TopNavigationBar = () => {
  const { loading } = useLoading()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    if (!loading) {
      const { success, message } = await logout()
      if (success) {
        toast.success(message)
        navigate('/login')
      } else toast.error(message)
    }
  };
  return (
    <nav className="bg-zinc-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left Section: Logo and Navigation Links */}
        <div className="flex items-center space-x-6">
          <div className="text-xl font-semibold">Authify</div>
          <div className="hidden md:flex space-x-4">
            <a href="/" className="hover:text-gray-400">Home</a>
          </div>
        </div>

        {/* Right Section: Logout */}
        <div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigationBar;
