import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Verifică dacă utilizatorul este deja autentificat
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios
        .get('https://bug-management-app.vercel.app/auth/verify') // Endpoint-ul pentru verificarea token-ului
        .then((response) => {
          if (response.data) {
            setUser({ email: response.data.email, role: response.data.role });
            if (response.data.role === 'Member') {
              navigate('/MemberDashboard');
            } else {
              navigate('/TesterDashboard');
            }
          }
        })
        .catch((error) => {
          console.log('Verification failed', error);
          localStorage.removeItem('authToken'); // Șterge token-ul dacă nu este valid
        });
    }
  }, [setUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://bug-management-app.vercel.app/auth/login',
        { email, password }
      );

      if (response.data.token) {
        const token = response.data.token;
        localStorage.setItem('authToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Setează utilizatorul și navighează către dashboardul corespunzător
        setUser({ email, role: response.data.role });
        alert('Login successful');

        if (response.data.role === 'Member') {
          navigate('/MemberDashboard');
        } else {
          navigate('/TesterDashboard');
        }
      } else {
        alert('Invalid login credentials');
      }
    } catch (error) {
      console.error('Login error', error);
      alert(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Navighează la formularul de înregistrare
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Login
        </button>
        <button
          type="button"
          onClick={handleRegisterRedirect}
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 mt-4"
        >
          Go to Register
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
