import React from 'react';

const TopNavigationBar = ({ onLogout }) => {
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
            onClick={onLogout}
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
