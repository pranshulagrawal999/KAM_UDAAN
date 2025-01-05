import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-lg border-b border-blue-100">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <div className="flex items-center">
                    <Link 
                        to="/dashboard" 
                        className="text-blue-800 font-extrabold text-3xl hover:text-blue-600 transition-colors duration-200"
                    >
                        Lead Management System
                    </Link>
                </div>

                <div className="flex items-center space-x-6">
                    {user ? (
                        <>
                            <Link 
                                to="/dashboard" 
                                className="text-blue-600 hover:text-blue-800 px-4 py-2 rounded-md text-xl font-medium transition-colors duration-200 hover:bg-blue-50"
                            >
                                Dashboard
                            </Link>
                            <Link 
                                to="/restaurants" 
                                className="text-blue-600 hover:text-blue-800 px-4 py-2 rounded-md text-xl font-medium transition-colors duration-200 hover:bg-blue-50"
                            >
                                Restaurants
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link 
                                to="/login" 
                                className="text-blue-600 hover:text-blue-800 px-4 py-2 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-blue-50"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/register" 
                                className="bg-blue-600 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
