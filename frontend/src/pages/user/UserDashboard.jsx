import React, { useState } from 'react';
import useAuth from '../../contexts/authContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useLoading from '../../contexts/loadingContext';
import EditDetailsModal from '../../components/user/EditDetailsModal';
import useUser from '../../contexts/userContext';


const UserDashboard = () => {
  const { loading } = useLoading()
  const { user, logout } = useAuth()
  const {editUserDetails} = useUser()
  const navigate = useNavigate()

  const handleLogout = async () => {
    const { success, message } = await logout()
    if(success){
      toast.success(message)
      navigate('/login')
    }else toast.error(message)
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = async (updatedDetails) => {
    console.log('Updated User Details:', updatedDetails)
    if(!loading){
      const {success, message} = await editUserDetails(updatedDetails.email, updatedDetails.name)
      if(success){
        toast.success(message)
      }else{
        toast.error(message)
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
      <div className="bg-white p-6 dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Welcome, {user.name || 'User'} {user.role}
        </h2>

        <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
          <p>
            <strong>Email:</strong> {user.email || 'email'}
          </p>
          <p>
            <strong>Account Created:</strong>{' '}
            {user.createdAt || "date"}
          </p>
          <p>
            <strong>Last Login:</strong>{' '}
            {user.lastLogin || "date"}
          </p>
        </div>

        <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Edit Details
      </button>

      {isModalOpen && (
        <EditDetailsModal
          user={user}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}

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
