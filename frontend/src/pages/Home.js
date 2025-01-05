import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    // Redirect authenticated users to the dashboard
    useEffect(() => {
        if (!loading && user) {
            navigate('/dashboard');
        }
    }, [user, loading, navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-blue-50">
                <div className="text-blue-500 text-xl animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-50">
            {/* Header Section */}
            <h1 className="text-5xl font-extrabold text-blue-600 mb-4 tracking-wide">
                Welcome to Leads Management
            </h1>
            <p className="text-lg text-blue-700 mb-12 opacity-80">
                Stay organized and manage your leads effectively with our smart system.
            </p>

            {/* Buttons Section */}
            <div className="flex space-x-6">
                <Link
                    to="/login"
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all ease-in-out duration-300 transform hover:scale-105"
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg border border-blue-600 shadow-md hover:bg-blue-100 transition-all ease-in-out duration-300 transform hover:scale-105"
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default Home;
