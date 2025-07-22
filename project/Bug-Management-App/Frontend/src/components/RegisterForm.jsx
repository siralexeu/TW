import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importăm useNavigate
import axios from 'axios';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Member'); // Adăugăm role
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initializăm hook-ul navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      email,
      password,
      role, // trimitem și role-ul
    };

    try {
      const response = await axios.post('https://bug-management-app.vercel.app/auth/register', newUser);
      setMessage(response.data.message); // Afișează mesajul de succes

      // Redirecționează către pagina de login după 3 secunde
      setTimeout(() => {
        navigate('/login');
      }, 3000); // 3000ms = 3 secunde
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message); // Afișează mesajul de eroare
      } else {
        setMessage('Server error');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        
        {message && (
          <div className="mb-4 text-center text-green-500">
            {message}
          </div>
        )}

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
        
        {/* Câmp pentru rol */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        >
          <option value="Member">Member</option>
          <option value="Tester">Tester</option>
        </select>

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
