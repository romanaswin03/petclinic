import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './components/Auth/AuthPage';
import Dashboard from './pages/Dashboard';
import DoctorDashboard from './components/Appointment/DoctorDashboard';
import AppointmentSummary from './components/Appointment/AppointmentSummary';
import BookAppointment from './components/Appointment/BookAppointment';
import HomePage from './components/Home/HomePage';
import ResetPassword from './utils/ResetPassword.jsx';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/book-appointment" element={<BookAppointment/>}/>
        <Route path="/doctor-dashboard" element={<DoctorDashboard/>}/>
        <Route path="/appointment-summary" element={<AppointmentSummary/>}/>     
        <Route path="/reset-password/:token" element={<ResetPassword/>} /> 
      </Routes>
  
  );
}

export default App;
