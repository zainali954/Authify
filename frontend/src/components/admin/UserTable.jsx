import React from 'react';
import toast from 'react-hot-toast';
import useUser from '../../contexts/userContext';

const UserTable = ({ users, onViewDetails }) => {
  const { loading, deleteUser } = useUser();

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;
    console.log(id)

    if (!loading) {
      try {
        const { success, message } = await deleteUser(id);
        if (success) {
          toast.success(message);
        } else {
          toast.error(message);
        }
      } catch (error) {
        toast.error('An error occurred while deleting the user');
      }
    } else {
      toast.error('Please wait, action is already in progress');
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-200 dark:bg-zinc-700">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Account Created</th>
            <th className="p-4 text-left">Last Login</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr
              key={user._id}
              className="border-t border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-700"
            >
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.role}</td>
              <td className="p-4">{user.isVerified ? 'Verified' : 'Unverified'}</td>
              <td className="p-4">{user.createdAt}</td>
              <td className="p-4">{new Date(user.lastLogin).toLocaleString()}</td>
              <td className="p-4 text-right space-x-2">
                <button
                  onClick={() => onViewDetails(user)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  disabled={loading}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
