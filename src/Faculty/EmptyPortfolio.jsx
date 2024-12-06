import React from 'react';
import { Link } from 'react-router-dom';

export default function EmptyPortfolio() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Did not designed Portfolio Yet!</h2>
        {/* message him or mail him to design his portfolio */}
        {/* <p className="text-gray-600 mb-6">Start building your professional portfolio to showcase your achievements.</p>
        <Link
          to="/createportfolio"
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Create Your Portfolio
        </Link> */}
      </div>
    </div>
  );
}