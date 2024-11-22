import React, { useState } from 'react';
import Input from '../../components/shared/Input'; // Assuming you're using the same Input component

const ResetPassword = ({ userEmail }) => {
  const [email, setEmail] = useState(userEmail || ''); // If userEmail is provided, use it.
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // If the email is provided by backend, skip the email validation
    if (!email) {
      setError("Email is required.");
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Simulate API call or password reset logic here
    console.log("Password reset successfully for:", email);

    // Reset fields after submission
    setEmail('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-slate-100">
      <div className="w-full max-w-md border border-gray-200 dark:border-zinc-700 bg-zinc-800 shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200">Reset Password</h2>
        <p className="text-center text-slate-400 mt-2">
          {userEmail ? "Enter your new password below." : "Enter your email and new password."}
        </p>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Email field only if the userEmail is not provided */}
          {!userEmail && (
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}

          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
