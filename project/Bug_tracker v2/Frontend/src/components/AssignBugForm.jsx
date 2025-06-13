import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AssignBugForm = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [bugs, setBugs] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedBugId, setSelectedBugId] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Load projects on component mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/projects', {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });
        setProjects(response.data);
      } catch (err) {
        setError('Failed to load projects.');
      }
    };

    loadProjects();
  }, []);

  // Load members for the selected project
  useEffect(() => {
    const loadMembers = async () => {
      if (!selectedProjectId) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/projects/${selectedProjectId}/members`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
          }
        );
        setMembers(response.data || []);
      } catch (err) {
        setError('Failed to load team members.');
      }
    };

    loadMembers();
  }, [selectedProjectId]);

// Load bugs for the selected project
useEffect(() => {
  const loadBugs = async () => {
    if (!selectedProjectId) return;

    try {
      const response = await axios.get(
        `http://localhost:5000/projects/${selectedProjectId}/bugs`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        }
      );

      // Filtrează doar bug-urile neatribuite (assigned: false)
      const unassignedBugs = response.data.filter((bug) => bug.assigned === false);
      setBugs(unassignedBugs);
    } catch (err) {
      setError('Failed to load bugs.');
    }
  };

  loadBugs();
}, [selectedProjectId]);

  const toggleMemberSelection = (email) => {
    if (selectedMembers.includes(email)) {
      setSelectedMembers(selectedMembers.filter((member) => member !== email));
    } else {
      setSelectedMembers([...selectedMembers, email]);
    }
  };

  const handleAssignBug = async () => {
    if (!selectedBugId || selectedMembers.length === 0) {
      setError('Please select a bug and at least one member.');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/projects/${selectedProjectId}/bugs/${selectedBugId}/assign`,
        { assignees: selectedMembers },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        }
      );

      if (response.status === 200) {
        setSuccess('Bug successfully assigned!');
        setSelectedBugId('');
        setSelectedMembers([]);
        // Remove the assigned bug from the local list
        setBugs((prevBugs) => prevBugs.filter((bug) => bug._id !== selectedBugId));
        // Reset the members list (optional)
        const loadMembers = async () => {
          try {
            const response = await axios.get(
              `http://localhost:5000/projects/${selectedProjectId}/members`,
              {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
              }
            );
            setMembers(response.data || []);
          } catch (err) {
            setError('Failed to reload team members.');
          }
        };
        await loadMembers();
      
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError('Failed to assign bug. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Assign a Bug</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <div className="mb-4">
          <label htmlFor="project" className="block text-sm font-medium text-gray-700">
            Select Project
          </label>
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

        <div className="flex gap-6">
          {/* Bugs List */}
          <div className="w-1/2">
            <h3 className="text-lg font-bold mb-4">Bugs</h3>
            <ul className="space-y-4">
              {bugs.map((bug) => (
                <li
                  key={bug._id}
                  className={`p-3 border rounded-lg cursor-pointer ${
                    selectedBugId === bug._id
                      ? 'bg-blue-100 border-blue-500'
                      : 'border-gray-300'
                  }`}
                  onClick={() => setSelectedBugId(bug._id)}
                >
                  <h4 className="font-semibold">{bug.title}</h4>
                  <p>Severity: {bug.severity}</p>
                  <p>Priority: {bug.priority}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Members List */}
          <div className="w-1/2">
            <h3 className="text-lg font-bold mb-4">Members</h3>
            <ul className="space-y-4">
              {members.map((member) => (
                <li
                  key={member.email}
                  className={`p-3 border rounded-lg cursor-pointer ${
                    selectedMembers.includes(member.email)
                      ? 'bg-green-100 border-green-500'
                      : 'border-gray-300'
                  }`}
                  onClick={() => toggleMemberSelection(member.email)}
                >
                  <p>{member.email}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAssignBug}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-6"
        >
          Assign Bug
        </button>

        <button
          type="button"
          onClick={() => navigate('/MemberDashboard')}
          className="w-full py-3 bg-gray-500 text-white rounded-lg mt-4 hover:bg-gray-600"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AssignBugForm;
