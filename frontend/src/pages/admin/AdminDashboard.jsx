import React, { useState } from 'react';
import UserTable from '../../components/admin/UserTable';
import UserDetailsModal from '../../components/admin/UserDetailsModal';
import TopNavigationBar from '../../components/admin/TopNavigationBar';

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'User',
      status: 'Active',
      createdAt: '2023-01-01',
      lastLogin: '2023-11-20',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Admin',
      status: 'Inactive',
      createdAt: '2023-02-01',
      lastLogin: '2023-11-18',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'Moderator',
      status: 'Active',
      createdAt: '2023-03-01',
      lastLogin: '2023-11-22',
    },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [filters, setFilters] = useState({ role: '', status: '' });

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
  };





  const filteredUsers = users.filter(
    (user) =>
      (!filters.role || user.role === filters.role) &&
      (!filters.status || user.status === filters.status)
  );

  const closeDetailsModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 text-gray-800 dark:text-gray-200">
        <TopNavigationBar/>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>

        <UserTable
          users={filteredUsers}
          onDelete={handleDelete}
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
