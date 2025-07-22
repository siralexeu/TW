import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BugList = () => {
  const [bugs, setBugs] = useState([]);
  const [filteredBugs, setFilteredBugs] = useState([]);
  const [error, setError] = useState('');
  const [loadingBugs, setLoadingBugs] = useState(false);
  const [userRole, setUserRole] = useState(null); // Pentru a reține rolul utilizatorului
  const [statusFilter, setStatusFilter] = useState(''); // Filtru pentru status
  const [assignedFilter, setAssignedFilter] = useState(''); // Filtru pentru atribuire
  const [severityFilter, setSeverityFilter] = useState(''); // Filtru pentru severity
  const [priorityFilter, setPriorityFilter] = useState(''); // Filtru pentru priority
  const navigate = useNavigate();

  useEffect(() => {
    const loadBugsAndRole = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          navigate('/login');
          return;
        }

        // Decodăm token-ul pentru a obține rolul utilizatorului
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUserRole(decodedToken.role);

        // Obține toate bug-urile
        setLoadingBugs(true);
        const response = await axios.get('https://bug-management-app.vercel.app/bugs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBugs(response.data);
      } catch (error) {
        console.error('Error loading bugs or role', error);
        setError('Failed to load bugs.');
      } finally {
        setLoadingBugs(false);
      }
    };

    loadBugsAndRole();
  }, [navigate]);

  // Aplică filtrele asupra bug-urilor
  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...bugs];

      // Filtrare după starea de atribuire
      if (assignedFilter !== '') {
        filtered = filtered.filter((bug) =>
          assignedFilter === 'assigned' ? bug.assigned === true : bug.assigned === false
        );
      }

      // Filtrare după status
      if (statusFilter !== '') {
        filtered = filtered.filter((bug) => bug.status === statusFilter);
      }

      // Filtrare după severity
      if (severityFilter !== '') {
        filtered = filtered.filter((bug) => bug.severity === severityFilter);
      }

      // Filtrare după priority
      if (priorityFilter !== '') {
        filtered = filtered.filter((bug) => bug.priority === priorityFilter);
      }

      setFilteredBugs(filtered);
    };

    applyFilters();
  }, [bugs, statusFilter, assignedFilter, severityFilter, priorityFilter]);

  const handleBackToDashboard = () => {
    if (userRole === 'Member') {
      navigate('/MemberDashboard');
    } else if (userRole === 'Tester') {
      navigate('/TesterDashboard');
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Bug List</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Dropdown pentru filtrare după starea de atribuire */}
        <div className="mb-4">
          <label htmlFor="assignedFilter" className="block text-sm font-medium text-gray-700">
            Filter by Assignment
          </label>
          <select
            id="assignedFilter"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            value={assignedFilter}
            onChange={(e) => setAssignedFilter(e.target.value)}
          >
            <option value="">-- All Bugs --</option>
            <option value="assigned">Assigned</option>
            <option value="unassigned">Unassigned</option>
          </select>
        </div>

        {/* Dropdown pentru filtrare după status */}
        <div className="mb-4">
          <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700">
            Filter by Status
          </label>
          <select
            id="statusFilter"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">-- All Statuses --</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {/* Dropdown pentru filtrare după severity */}
        <div className="mb-4">
          <label htmlFor="severityFilter" className="block text-sm font-medium text-gray-700">
            Filter by Severity
          </label>
          <select
            id="severityFilter"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
          >
            <option value="">-- All Severities --</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Dropdown pentru filtrare după priority */}
        <div className="mb-4">
          <label htmlFor="priorityFilter" className="block text-sm font-medium text-gray-700">
            Filter by Priority
          </label>
          <select
            id="priorityFilter"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">-- All Priorities --</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {loadingBugs ? (
          <p className="text-center text-gray-700">Loading bugs...</p>
        ) : filteredBugs.length === 0 ? (
          <p className="text-center text-gray-700">No bugs match the selected filters.</p>
        ) : (
          <div className="overflow-y-scroll h-[700px]"> {/* Scrollable list */}
            <ul className="space-y-4">
              {filteredBugs.map((bug) => (
                <li key={bug._id} className="p-4 border border-gray-300 rounded-lg">
                  <h3 className="text-lg font-semibold">{bug.title}</h3>
                  <p><strong>Project:</strong> {bug.projectId?.name || 'No project'}</p>
                  <p><strong>Description:</strong> {bug.description || 'No description provided'}</p>
                  <p><strong>Severity:</strong> {bug.severity}</p>
                  <p><strong>Priority:</strong> {bug.priority}</p>
                  <p><strong>Status:</strong> {bug.status}</p>
                  {bug.commitLink && (
                    <p>
                      <strong>Commit Link:</strong>{' '}
                      <a
                        href={bug.commitLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Commit
                      </a>
                    </p>
                  )}
                  {bug.assignee && <p><strong>Assignee:</strong> {bug.assignee}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={handleBackToDashboard}
          className="w-full py-3 bg-gray-500 text-white rounded-lg mt-6 hover:bg-gray-600"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default BugList;
