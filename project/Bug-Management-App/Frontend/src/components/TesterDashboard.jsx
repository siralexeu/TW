import React from 'react';
import { useNavigate } from 'react-router-dom';

const TesterDashboard = ({ user }) => {
  const navigate = useNavigate();

  // Extrage partea de dinaintea '@' din email
  const username = user.email.split('@')[0];

  const handleNavigate = (path) => {
    navigate(path); // Redirecționează către rutele respective
  };

  return (
    <div className="flex flex-col justify-center items-center p-6 bg-gray-100 h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome, {username}</h2>
        <div className="space-y-4">
          <button 
            onClick={() => handleNavigate('/projects')} 
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            View Projects
          </button>
          <button 
            onClick={() => handleNavigate('/report-bug')} 
            className="w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Report Bug
          </button>
          <button 
            onClick={() => handleNavigate('/bugs')} 
            className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            View Bugs
          </button>
        </div>
      </div>
    </div>
  );
};

export default TesterDashboard;
