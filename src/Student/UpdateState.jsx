import React from 'react';
import { Link } from 'react-router-dom';

export default function UpdateState() {
  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">You Have already designed your Portfolio</h2>
        <p className="text-gray-600 mb-6">Click here to make your portfolio more beautiful!</p>
        <Link
          to="/updateportfolio"
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Update Your Portfolio
        </Link>
      </div>
    </div>
  );
}