import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const doctorId = user.id || user._id;
      const res = await api.get(`/api/appointments/doctor/${doctorId}`);
      console.log('Fetched appointments:', res.data);
      
      setAppointments(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load appointments', err.response?.data || err);
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/api/appointments/${id}/status`, { status });
      fetchAppointments(); // Refresh list
    } catch (err) {
      console.error(err);
      alert('Error updating status');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Doctor Dashboard</h2>

        {loading ? (
          <p>Loading appointments...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <table className="w-full  border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Pet Owner</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt._id} className="text-center">
                  <td className="p-2 border">{appt.petOwnerId?.name || 'N/A'}</td>
                  <td className="p-2 border">{new Date(appt.date).toLocaleDateString()}</td>
                  <td className="p-2 border">{appt.status}</td>
                  <td className="p-2 border space-x-2">
                    {appt.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateStatus(appt._id, 'approved')}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(appt._id, 'rejected')}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {appt.status !== 'pending' && <span className="text-gray-500">No Actions</span>}
                  </td>
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

export default DoctorDashboard;
