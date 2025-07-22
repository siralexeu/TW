import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProjectForm = () => {
  const [name, setName] = useState('');
  const [repositoryUrl, setRepositoryUrl] = useState('');
  const [teamMembers, setTeamMembers] = useState('');
  const [message, setMessage] = useState('');
  const [userRole, setUserRole] = useState(null); // Stocăm rolul utilizatorului
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      // Dacă nu există token, redirecționează utilizatorul la login
      navigate('/login');
      return;
    }

    // Decodează token-ul pentru a obține rolul utilizatorului
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserRole(decodedToken.role);
    } catch (error) {
      console.error('Error decoding token', error);
      setMessage('Failed to authenticate. Please log in again.');
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    if (!token) {
      alert('You must be logged in to create a project!');
      return;
    }

    try {
      const response = await axios.post(
        'https://bug-management-app.vercel.app/projects',
        {
          name,
          repositoryUrl,
          teamMembers: teamMembers.split(',').map((email) => ({ email: email.trim(), role: 'Member' })),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(`Project created successfully with ID: ${response.data.projectId}`);
      setName('');
      setRepositoryUrl('');
      setTeamMembers('');
    } catch (error) {
      console.error('Error creating project', error);
      setMessage('Project creation failed');
    }
  };

  const handleBackToDashboard = () => {
    if (userRole === 'Member') {
      navigate('/MemberDashboard');
    } else if (userRole === 'Tester') {
      navigate('/TesterDashboard');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Project</h2>
        {message && <p className={`text-center mb-4 ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-2">Project Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Enter project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="repositoryUrl" className="block text-sm font-semibold mb-2">Repository URL</label>
            <input
              type="text"
              id="repositoryUrl"
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Enter repository URL"
              value={repositoryUrl}
              onChange={(e) => setRepositoryUrl(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="teamMembers" className="block text-sm font-semibold mb-2">Team Members (comma separated)</label>
            <input
              type="text"
              id="teamMembers"
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Enter team members"
              value={teamMembers}
              onChange={(e) => setTeamMembers(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4">
            Add Project
          </button>
        </form>

        <button
          onClick={handleBackToDashboard}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AddProjectForm;
