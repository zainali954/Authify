import React, { useState } from 'react';
import UserTable from '../../components/admin/UserTable';
import UserDetailsModal from '../../components/admin/UserDetailsModal';
import TopNavigationBar from '../../components/admin/TopNavigationBar';
import useAuth from '../../contexts/authContext';
import useUser from '../../contexts/userContext';
import useLoading from '../../contexts/loadingContext';

const AdminDashboard = () => {
  const { users } = useUser()
  const [selectedUser, setSelectedUser] = useState(null);

  const handleViewDetails = (user) => {
    setSelectedUser(user);
  };


  const closeDetailsModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 text-gray-800 dark:text-gray-200">
      <TopNavigationBar />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>

        <UserTable
          users={users}
          onViewDetails={handleViewDetails}
        />

        {selectedUser && (
          <UserDetailsModal user={selectedUser} onClose={closeDetailsModal} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
