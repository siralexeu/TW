import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResolveBug = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [bugs, setBugs] = useState([]);
  const [selectedBugId, setSelectedBugId] = useState('');
  const [status, setStatus] = useState('');
  const [resolutionCommitLink, setResolutionCommitLink] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Verificare autentificare la începutul componentei
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login'); // Redirecționează dacă utilizatorul nu este autentificat
    }
  }, [navigate]);

  // Încarcă lista de proiecte când componenta se montează
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          navigate('/login'); // Redirecționează dacă utilizatorul nu este autentificat
          return;
        }

        const response = await axios.get('http://localhost:5000/projects', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(response.data);
      } catch (err) {
        setError('Failed to load projects.');
      }
    };

    loadProjects();
  }, [navigate]);

  // Încarcă lista de bug-uri când se selectează un proiect
  useEffect(() => {
    const loadBugs = async () => {
      if (!selectedProjectId) return;
  
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(
          `http://localhost:5000/projects/${selectedProjectId}/bugs`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        // Filtrare bug-uri: assigned = true și status = 'Open' sau 'In Progress'
        const filteredBugs = response.data.filter(
          (bug) => bug.assigned === true && (bug.status === 'Open' || bug.status === 'In Progress')
        );
  
        setBugs(filteredBugs);
      } catch (err) {
        setError('Failed to load bugs.');
      }
    };
  
    loadBugs();
  }, [selectedProjectId]);

  const handleResolveBug = async () => {
    if (!selectedBugId || !status || !resolutionCommitLink) {
      setError('All fields are required!');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put(
        `http://localhost:5000/projects/${selectedProjectId}/bugs/${selectedBugId}/resolve`,
        { status, resolutionCommitLink },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess(response.data.message || 'Bug successfully resolved!');
      setError('');
      setStatus('');
      setResolutionCommitLink('');
      setSelectedBugId('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resolve bug.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Resolve Bug</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-500 mb-4 text-center">{success}</p>}

        <div className="mb-4">
          <label htmlFor="project" className="block text-sm font-medium text-gray-700">
            Select Project
          </label>
          <select
            id="project"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
          >
            <option value="">-- Select a project --</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="bug" className="block text-sm font-medium text-gray-700">
            Select Bug to Resolve
          </label>
          <select
            id="bug"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            value={selectedBugId}
            onChange={(e) => setSelectedBugId(e.target.value)}
          >
            <option value="">-- Select a bug --</option>
            {bugs.map((bug) => (
              <option key={bug._id} value={bug._id}>
                {bug.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="Resolved">Resolved</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="resolutionCommitLink" className="block text-sm font-medium text-gray-700">
            Resolution Commit Link
          </label>
          <input
            type="text"
            id="resolutionCommitLink"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            placeholder="Enter the resolution commit link"
            value={resolutionCommitLink}
            onChange={(e) => setResolutionCommitLink(e.target.value)}
          />
        </div>

        <button
          onClick={handleResolveBug}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
        >
          Change Status
        </button>

        <button
          onClick={() => navigate('/MemberDashboard')}
          className="w-full py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ResolveBug;
