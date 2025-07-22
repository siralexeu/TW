import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState(null); // Stocăm rolul utilizatorului
  const navigate = useNavigate();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        // Verifică dacă token-ul de autentificare există în localStorage
        const token = localStorage.getItem('authToken');
        if (!token) {
          // Dacă nu există token, redirecționează utilizatorul la login
          navigate('/login');
          return;
        }

        // Setează token-ul în header
        const response = await axios.get('https://bug-management-app.vercel.app/projects', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Setează datele proiectelor
        setProjects(response.data);

        // Obține rolul utilizatorului din token
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUserRole(decodedToken.role);

      } catch (error) {
        console.error('Error loading projects', error);
        setError('Failed to load projects.');
      }
    };

    loadProjects();
  }, [navigate]); // Navigarea e în dependență pentru a asigura că schimbările de navigare sunt corect gestionate

  const handleAddProject = () => {
    navigate('/add-project'); // Navighează la formularul de adăugare proiect
  };

  const handleBackToDashboard = () => {
    // Redirecționează utilizatorul în funcție de rol
    if (userRole === 'Member') {
      navigate('/MemberDashboard');
    } else if (userRole === 'Tester') {
      navigate('/TesterDashboard');
    }
  };

  return (
    <div className="flex justify-center items-start pt-8 h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Projects</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Zona derulabilă pentru listă */}
        <div className="overflow-y-auto max-h-[550px] mb-6">
          {/* max-h-[600px] crește înălțimea maximă a listei */}
          <ul>
            {projects.length === 0 ? (
              <p>No projects available</p>
            ) : (
              projects.map((project) => (
                <li key={project._id} className="mb-4 p-4 border border-gray-300 rounded-lg">
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <p>Repository: {project.repositoryUrl}</p>
                  <p>Team Members: {project.teamMembers.map(member => member.email).join(', ')}</p>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Butoanele sunt acum în afara containerului listei */}
        <div className="space-y-4">
          <button
            onClick={handleAddProject}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Add New Project
          </button>

          <button
            onClick={handleBackToDashboard}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
