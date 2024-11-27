import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-zinc-900 text-white">
      {/* Header */}
      <header className="p-6 text-center bg-zinc-800 shadow-md">
        <h1 className="text-4xl font-bold text-green-600">Welcome to Authify</h1>
        <nav className="mt-4">
          <Link to="/login" className="text-lg text-zinc-300 hover:text-green-600 mx-4">Login</Link>
          <Link to="/register" className="text-lg text-zinc-300 hover:text-green-600 mx-4">Register</Link>
        </nav>
      </header>

      {/* Main Section */}
      <main className="flex-1 flex flex-col justify-center items-center p-8 text-center">
        <h2 className="text-3xl font-semibold mb-4">Secure Authentication, Simplified</h2>
        <p className="text-lg mb-6">Join us and experience easy and secure login and registration.</p>
        <div className="space-x-4">
          <Link to="/login" className="bg-green-500 text-zinc-900 px-6 py-3 rounded-md text-lg hover:bg-green-600 transition duration-300">Login</Link>
          <Link to="/register" className="border-2 border-green-600 text-green-500 px-6 py-3 rounded-md text-lg hover:bg-green-600 hover:text-zinc-900 transition duration-300">Register</Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-800 text-center py-4">
        <p className="text-sm text-zinc-400">© 2024 Authify - All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
