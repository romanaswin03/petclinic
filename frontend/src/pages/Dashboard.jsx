import React, { useEffect, useState } from 'react';
import { getUser, logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = getUser();
    if (!u) {
      navigate('/');
    } else {
      setUser(u);
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-md rounded p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>
        <p className="mb-6">You are logged in as a <strong>{user.role}</strong>.</p>

        {user.role === 'pet_owner' && (
          <button
            onClick={() => navigate('/book-appointment')}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-3"
          >
            Book Appointment
          </button>
        )}

        {user.role === 'doctor' && (
          <button
            onClick={() => navigate('/doctor-dashboard')}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-3"
          >
            View Appointments
          </button>
        )}

        <button
          onClick={() => navigate("/appointment-summary")}
          className="mt-4 mb-2 w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
        >
          Appointment Summary
        </button>

        <button
          onClick={handleLogout}
          className="w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
