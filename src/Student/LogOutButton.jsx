import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import Navigation from './Navigation';

export default function LogOutButton({ onLogout }) {


  return (
    <div>
     <Navigation onLogout={onLogout} />
    </div>
  );
}