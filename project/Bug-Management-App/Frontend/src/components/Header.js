import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Funcția pentru Logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Șterge token-ul din localStorage
    navigate('/login'); // Redirecționează la pagina de login
  };

  // Verifică dacă ne aflăm pe una dintre paginile dashboard
  const isDashboard =
    location.pathname === '/MemberDashboard' ||
    location.pathname === '/TesterDashboard';

  return (
    <header className="bg-blue-500 text-white flex justify-between items-center p-5 relative">
      <h1 className="text-3xl">BugTerminator</h1>
      {isDashboard && (
        <button
          onClick={handleLogout}
          className="absolute top-1/2 right-5 transform -translate-y-1/2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Log Out
        </button>
      )}
    </header>
  );
};

export default Header;
