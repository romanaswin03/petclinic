import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const AppointmentSummary = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchAllAppointments = async () => {
    try {
      const res = await api.get('/api/appointments/all');
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Appointment Summary</h2>

        {loading ? (
          <p>Loading appointments...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Doctor</th>
                <th className="p-2 border">Pet Owner</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt._id} className="text-center">
                  <td className="p-2 border">{appt.doctorId?.name || 'N/A'}</td>
                  <td className="p-2 border">{appt.petOwnerId?.name || 'N/A'}</td>
                  <td className="p-2 border">{new Date(appt.date).toLocaleDateString()}</td>
                  <td className="p-2 border capitalize">{appt.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AppointmentSummary;
