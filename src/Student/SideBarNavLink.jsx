import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SideBarNavLink({ to, icon: Icon, children }) {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 text-[15px] font-medium rounded-lg transition-all duration-200 ${
          isActive 
            ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
            : 'text-black-600 hover:bg-gray-50 hover:text-gray-900'
        }`
      }
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="truncate">{children}</span>
    </NavLink>
  );
}