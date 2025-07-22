import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteProject = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Folosește navigate pentru a redirecționa utilizatorul

  // Încarcă lista de proiecte când componenta se montează
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await axios.get('https://bug-management-app.vercel.app/projects', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          }
        });
        setProjects(response.data);
      } catch (err) {
        setError('Failed to load projects.');
      }
    };
    loadProjects();
  }, []);

  const handleDelete = async () => {
    if (!selectedProjectId) {
      setError('Please select a project to delete.');
      return;
    }
  
    setError('');
    setSuccess('');
  
    try {
      const response = await axios.delete(`https://bug-management-app.vercel.app/projects/${selectedProjectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        }
      });
  
      if (response.status === 200) {
        setSuccess('Project deleted successfully!');
        setSelectedProjectId('');
        // Fără redirecționare automată
      }
    } catch (err) {
      setError('Failed to delete project. Please try again.');
    }
  };
  
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Delete Project</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <div className="mb-4">
          <label htmlFor="project" className="block text-sm font-medium text-gray-700">Select Project to Delete</label>
          <select
            id="project"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            onChange={(e) => setSelectedProjectId(e.target.value)}
            value={selectedProjectId}
          >
            <option value="">-- Select a project --</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Delete Project
        </button>

        <button
          type="button"
          onClick={() => navigate('/MemberDashboard')}
          className="w-full py-3 bg-gray-500 text-white rounded-lg mt-4 hover:bg-gray-600"
        >
          Back to Dashboard
        </button>
      </form>
    </div>
  );
};

export default DeleteProject;
