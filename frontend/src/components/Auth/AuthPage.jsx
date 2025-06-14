
// import React, { useContext, useState } from 'react';
// import api from '../../utils/api';
// import { saveUser } from '../../utils/auth';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../contexts/AuthContext';

// const AuthPage = () => {
//   const {login} =useContext(AuthContext)
//   const [isLogin, setIsLogin] = useState(true);
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'pet_owner',
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const toggleForm = () => {
//     setIsLogin(!isLogin);
//     setError('');
//     setForm({
//       name: '',
//       email: '',
//       password: '',
//       role: 'pet_owner',
//     });
//   };

//   const handleChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     console.log("Login payload:", {
//     email: form.email,
//     password: form.password,
//     });
//     const endpoint = isLogin
//       ? '/api/auth/login'
//       : '/api/auth/register';

//     // Build payload: include role only during registration
//     const payload = isLogin
//       ? { email: form.email, password: form.password }
//       : {
//           name: form.name,
//           email: form.email,
//           password: form.password,
//           role: form.role,
//         };

//     try {
//       const res = await api.post(endpoint, payload);
//       const { token, user } = res.data;
//       login(user, token);
//       localStorage.setItem('token', token);
//       saveUser(user);
//       navigate('/');
//     } catch (err) {
//       console.error('Auth error:', err.response?.data);
//       setError(
//         err.response?.data?.message ||
//         'Something went wrong. Please try again.'
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           {isLogin ? 'Login' : 'Register'}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {!isLogin && (
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={form.name}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
//             />
//           )}
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
//           />
//           {!isLogin && (
//             <select
//               name="role"
//               value={form.role}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
//             >
//               <option value="pet_owner">Pet Owner</option>
//               <option value="doctor">Doctor</option>
//             </select>
//           )}
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <button
//             type="submit"
//             className="w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-600 transition"
//           >
//             {isLogin ? 'Login' : 'Register'}
//           </button>
//         </form>

//         <p className="text-sm text-center mt-4">
//           {isLogin ? 'New here?' : 'Already have an account?'}{' '}
//           <button onClick={toggleForm} className="text-blue-400 hover:underline">
//             {isLogin ? 'Register' : 'Login'}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;


import React, { useContext, useState } from 'react';
import api from '../../utils/api';
import { saveUser } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const AuthPage = () => {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [forgot, setForgot] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'pet_owner' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setForgot(false);
    setForm({ name: '', email: '', password: '', role: 'pet_owner' });
  };

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (forgot) {
      // Forgot password flow
      try {
        await api.post('/api/auth/forgot-password', { email: form.email });
        alert('Reset link sent—check your email.');
        setForgot(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to send reset link');
      }
      return;
    }

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin
      ? { email: form.email, password: form.password }
      : { name: form.name, email: form.email, password: form.password, role: form.role };

    try {
      const res = await api.post(endpoint, payload);
      const { token, user } = res.data;
      login(user, token);
      localStorage.setItem('token', token);
      saveUser(user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {forgot ? 'Reset Password' : isLogin ? 'Login' : 'Register'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && !forgot && (
            <input name="name" placeholder="Full Name" value={form.name}
              onChange={handleChange} required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring" />
          )}
          <input name="email" type="email" placeholder="Email" value={form.email}
            onChange={handleChange} required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring" />
          {!forgot && (
            <>
              <input name="password" type="password" placeholder="Password" value={form.password}
                onChange={handleChange} required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring" />
              {!isLogin && (
                <select name="role" value={form.role} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring">
                  <option value="pet_owner">Pet Owner</option>
                  <option value="doctor">Doctor</option>
                </select>
              )}
            </>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {!forgot && isLogin && (
            <div className="text-right">
              <button type="button" onClick={() => setForgot(true)} 
                className="text-blue-500 text-sm hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            {forgot ? 'Send Reset Link' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        {!forgot && (
          <p className="text-sm text-center mt-4">
            {isLogin ? "Don't have an account?" : 'Already registered?'}{' '}
            <button onClick={toggleForm} className="text-blue-500 hover:underline">
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
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

export default AuthPage;
