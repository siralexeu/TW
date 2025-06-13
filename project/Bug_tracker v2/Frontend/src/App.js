import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Include componenta Header
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ProjectList from './components/ProjectList';
import AddProjectForm from './components/AddProjectForm';
import ReportBugForm from './components/ReportBugForm';
import MemberDashboard from './components/MemberDashboard';
import TesterDashboard from './components/TesterDashboard';
import DeleteProject from './components/DeleteProject';
import BugList from './components/BugList';
import AssignBugForm from './components/AssignBugForm';
import HomePage from './components/HomePage';
import ResolveBug from './components/RezolvedBug';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null); // Starea utilizatorului

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Șterge token-ul de autentificare
    setUser(null); // Resetează utilizatorul
  };

  return (
    // Adaugăm `basename` pentru a gestiona corect rutele pe subdomenii
    <Router basename="/Bug-Management-App">
      <div>
        {/* Include header-ul cu user-ul transmis ca proprietate și logout handler */}
        <Header user={user} handleLogout={handleLogout} />
        <Routes>
          {/* Login și Register */}
          <Route path="/login" element={<LoginForm setUser={setUser} />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* Proiecte */}
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/add-project" element={<AddProjectForm />} />
          <Route path="/delete-project" element={<DeleteProject />} />

          {/* Dashboard-uri */}
          <Route
            path="/MemberDashboard"
            element={
              user && user.role === 'Member' ? (
                <MemberDashboard user={user} />
              ) : (
                <LoginForm setUser={setUser} />
              )
            }
          />
          <Route
            path="/TesterDashboard"
            element={
              user && user.role === 'Tester' ? (
                <TesterDashboard user={user} />
              ) : (
                <LoginForm setUser={setUser} />
              )
            }
          />

          {/* Raportare Bug */}
          <Route path="/report-bug" element={<ReportBugForm />} />

          {/* Lista Bug-uri */}
          <Route path="/bugs" element={<BugList />} />

          {/* Alocarea unui Bug */}
          <Route path="/assign-bug" element={<AssignBugForm />} />
          <Route path="/" element={<LoginForm setUser={setUser} />} />
          <Route path="resolve-bug" element={<ResolveBug/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
