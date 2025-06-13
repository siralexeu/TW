import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProjects } from '../services/api';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState(null); // Stocăm rolul utilizatorului
  const navigate = useNavigate();

  useEffect(() => {
    // Obține rolul utilizatorului din token
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifică payload-ul JWT
      setUserRole(payload.role);
    }

    // Încarcă proiectele
    const loadProjects = async () => {
      setLoading(true);
      try {
        const response = await fetchProjects();
        setProjects(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleAddProject = () => {
    navigate('/add-project'); // Navighează la formularul de adăugare proiect
  };

  const handleBackToDashboard = () => {
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

        <div className="overflow-y-auto max-h-[550px] mb-6">
          <ul>
            {loading ? (
              <p>Loading projects...</p>
            ) : projects.length === 0 ? (
              <p>No projects available</p>
            ) : (
              projects.map((project) => (
                <li key={project._id} className="mb-4 p-4 border border-gray-300 rounded-lg">
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <p>Repository: {project.repositoryUrl}</p>
                  <p>
                    Team Members: 
                    {project.teamMembers.length > 0 
                      ? project.teamMembers.map((member) => member.email).join(', ') 
                      : 'No members assigned'}
                  </p>
                </li>
              ))
            )}
          </ul>
        </div>

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
