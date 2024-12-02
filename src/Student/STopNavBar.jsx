import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, Link } from 'lucide-react';
import { useNavigate, NavLink } from 'react-router-dom';

function STopNavbar({ onLogout }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    onLogout();  // Clear login data
  
    setTimeout(() => {
      navigate('/login');  // Redirect after a short delay
    }, 200);  // Adjust the delay as needed (in milliseconds)
  };
  

  return (
    <nav className="navbar flex justify-end items-center space-x-4 p-4" style={{ height: '70px' }}>
      <div className="profile-menu" ref={profileRef}>
        <button 
          className="profile-button"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
            <User className="w-5 h-5 text-indigo-600" />
          </div>
          <span className="hidden md:inline text-gray-700">Profile</span>
        </button>

        {isProfileOpen && (
          <div className="profile-dropdown">
            <button className="profile-dropdown-item">
              <NavLink to="studentprofile"  >
              <User className="w-4 h-4 inline-block mr-2" />
              Profile
              </NavLink>
            </button>
            <button className="profile-dropdown-item">
              <Settings className="w-4 h-4 inline-block mr-2" />
              Security
            </button>
          </div>
        )}
      </div>

      {/* Logout Button placed beside profile */}
      <button 
        className="logout-button ml-4 text-red-600 hover:bg-red-50 flex items-center"
        onClick={handleLogout}
      >
        <LogOut className="w-5 h-5 inline-block mr-2" />
        Logout
      </button>
    </nav>
  );
}

export default STopNavbar;
