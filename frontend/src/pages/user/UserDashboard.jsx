import React from 'react';

const UserDashboard = () => {
  const handleLogout = () => {
    // Logic to log the user out
    console.log('User logged out');
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
      <div className="bg-white p-6 dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Welcome, 'User'
        </h2>

        <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
          <p>
            <strong>Email:</strong> 'email'
          </p>
          <p>
            <strong>Account Created:</strong>{' '}
            'date'
          </p>
          <p>
            <strong>Last Login:</strong>{' '}
            'date'
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
