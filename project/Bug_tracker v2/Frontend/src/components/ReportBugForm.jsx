import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReportBugForm = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('');
  const [priority, setPriority] = useState('');
  const [commitLink, setCommitLink] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Fetch projects on component mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/projects', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setProjects(response.data);
      } catch (err) {
        setError('Failed to load projects.');
      }
    };
    loadProjects();
  }, []);

  const handleReportBug = async () => {
    if (!selectedProjectId || !title || !severity || !priority) {
      setError('All fields are required except description and commit link.');
      return;
    }

    setError('');
    setSuccess('');

    try {
      const response = await axios.post(
        `http://localhost:5000/projects/${selectedProjectId}/bugs`,
        {
          title,
          description,
          severity,
          priority,
          commitLink,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccess('Bug reported successfully!');
        setTitle('');
        setDescription('');
        setSeverity('');
        setPriority('');
        setCommitLink('');
        setSelectedProjectId('');
      }
    } catch (err) {
      setError('Failed to report bug. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-screen-lg"> {/* Updated to full canvas */}
        <h2 className="text-2xl font-bold text-center mb-6">Report a Bug</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        {/* Dropdown pentru proiecte */}
        <div className="mb-4">
          <label htmlFor="project" className="block text-sm font-medium text-gray-700">Select Project</label>
          <select
            id="project"
            className="w-full p-3 border border-gray-300 rounded-lg"
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

        {/* Câmpuri pentru bug */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Bug Title</label>
          <input
            type="text"
            id="title"
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter bug title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter bug description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="severity" className="block text-sm font-medium text-gray-700">Severity</label>
            <select
              id="severity"
              className="w-full p-3 border border-gray-300 rounded-lg"
              onChange={(e) => setSeverity(e.target.value)}
              value={severity}
              required
            >
              <option value="">-- Select severity --</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              id="priority"
              className="w-full p-3 border border-gray-300 rounded-lg"
              onChange={(e) => setPriority(e.target.value)}
              value={priority}
              required
            >
              <option value="">-- Select priority --</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="commitLink" className="block text-sm font-medium text-gray-700">Commit Link</label>
          <input
            type="text"
            id="commitLink"
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter commit link (optional)"
            value={commitLink}
            onChange={(e) => setCommitLink(e.target.value)}
          />
        </div>

        <button
          type="button"
          onClick={handleReportBug}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Report Bug
        </button>

        <button
          type="button"
          onClick={() => navigate('/TesterDashboard')}
          className="w-full py-3 bg-gray-500 text-white rounded-lg mt-4 hover:bg-gray-600"
        >
          Back to Dashboard
        </button>
      </form>
    </div>
  );
};

export default ReportBugForm;
