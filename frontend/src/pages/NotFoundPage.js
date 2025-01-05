import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 px-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-blue-700">Page Not Found</h2>
          <p className="text-gray-600">Sorry, the page you're looking for doesn't exist.</p>
        </div>
        
        <Link 
          to="/dashboard" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
