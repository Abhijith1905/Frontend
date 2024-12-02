import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function SideBarLogo() {
  return (
    <div className="px-6 py-8 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <GraduationCap className="w-8 h-8 text-indigo-600" />
        <div>
          <h1 className="text-xl font-bold text-gray-900">Student Portal</h1>
          <p className="text-sm text-gray-500">Learning Management</p>
        </div>
      </div>
    </div>
  );
}