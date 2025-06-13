import React from 'react';
import { useNavigate } from 'react-router-dom';

const MemberDashboard = ({ user }) => {
  const navigate = useNavigate();

  const username = user.email.split('@')[0];
  // Dacă utilizatorul nu este membru, redirecționează-l la login
  if (!user || user.role !== 'Member') {
    navigate('/login');
    return null; // Împiedică afișarea dashboard-ului
  }

  const handleNavigate = (path) => {
    navigate(path); // Redirecționează către rutele respective
  };

  return (
    <div className="flex flex-col justify-center items-center p-6 bg-gray-100 h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome, {username}</h2>
        <div className="space-y-4">
          <button 
            onClick={() => handleNavigate('/add-project')} 
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add New Project
          </button>
          <button 
            onClick={() => handleNavigate('/projects')} 
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            View Projects
          </button>
          <button 
            onClick={() => handleNavigate('/bugs')} 
            className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            View Bugs
          </button>
          <button 
            onClick={() => handleNavigate('/delete-project')} 
            className="w-full py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Delete Project
          </button>
          {/* Buton pentru alocarea bug-urilor */}
          <button 
            onClick={() => handleNavigate('/assign-bug')} 
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Assign Bug
          </button>
          {/* Buton pentru rezolvarea bug-urilor */}
          <button 
            onClick={() => handleNavigate('/resolve-bug')} 
            className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Resolve Bug
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
