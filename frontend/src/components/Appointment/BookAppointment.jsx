import React, { useContext, useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const BookAppointment = () => {
  const {user} = useContext(AuthContext);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    doctorId: "",
    date: "",
    petOwnerId: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get("/api/appointments/doctors");
        console.log("Doctors:", res.data);
        setDoctors(res.data);
      } catch (err) {
        console.error("Doctor fetch error:", err);
        setError("Login First");
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setForm((prev) =>({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    if(!user){
        throw new Error('You must be logged in to book an appointment')
      }
    try {
      //const storeduser = localStorage.getItem('user');
      // const user = JSON.parse(user);
      const formData = {
          doctorId: form.doctorId,
          date: form.date,
          petOwnerId: user._id || user.id
      };

      
      //const user = JSON.parse(localStorage.getItem('user'));
      console.log("Booking request:", formData, "User:", user);
      
      const response = await api.post("/api/appointments/book" , formData,
        // {
        // headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        // }
      );
      console.log("Booking success: ",response.data);

      setSuccess("Appointment booked successfully!");
      setForm({ doctorId: "", date: "" });
    } catch (err) {
      console.error("Booking error: ", {
        data: err.response?.data,
        status: err.response?.status,
        headers: err.response?.headers
    });
      setError(err.response?.data?.message || "Failed to book appointment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Book an Appointment</h2>

        {
          user ? (
          
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="doctorId"
            value={form.doctorId}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="">Select a Doctor</option>
            {doctors?.map((doc) => (
              <option key={doc._id} value={doc._id}>
                Dr. {doc.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button
            type="submit"
            className="w-full bg-blue-400 text-white py-3 rounded hover:bg-blue-600 transition font-medium"
          >
            Book Appointment
          </button>
      
        </form>
          ) : (
            <>
              <p className="text-center mb-4 text-red-500">
                You must <strong>Login</strong> to book an appointment.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Login
              </button>
            </>
          )}
        
          

        <button
          onClick={() => navigate("/")}
          className="mt-4 w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default BookAppointment;
