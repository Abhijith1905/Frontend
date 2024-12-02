import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function FTopNavbar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Clear login data

    setTimeout(() => {
      navigate('/login'); // Redirect after a short delay
    }, 200); // Adjust the delay as needed (in milliseconds)
  };

  return (
    <nav className="navbar flex justify-end items-center p-4 bg-white shadow-md" style={{ height: '70px' }}>
      <button
        className="logout-button text-red-600 hover:bg-red-50 flex items-center px-4 py-2 rounded-md"
        onClick={handleLogout}
      >
        <LogOut className="w-5 h-5 inline-block mr-2" />
        Logout
      </button>
    </nav>
  );
}

export default FTopNavbar;
