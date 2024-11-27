import React, { useState } from 'react';

const EditDetailsModal = ({ user, onClose, onSave }) => {
  const [email, setEmail] = useState(user.email);
  const [name, setname] = useState('');

  const handleSave = () => {
    onSave({ email, name });
    onClose(); // Close the modal after saving
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">Edit User Details</h2>
        <div className="space-y-4">
          {/* Email Field */}
          <input
            type="email"
            className="w-full p-3 border rounded dark:bg-zinc-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* name Field */}
          <input
            type="name"
            className="w-full p-3 border rounded dark:bg-zinc-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="New name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Cancel
          </button>
          {/* Save Button */}
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDetailsModal;
