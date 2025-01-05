// src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Context
export const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token')); // Add token state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Load user on initial render
    useEffect(() => {
        const loadUser = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
                    const res = await axios.get('https://kam-udaan.onrender.com/api/auth/me');
                    setUser(res.data.data); // Assuming /me returns { success: true, data: user }
                } catch (err) {
                    console.error(err);
                    setUser(null);
                    localStorage.removeItem('token');
                    setToken(null); // Clear token state
                    setError('');
                    delete axios.defaults.headers.common['Authorization']; // Remove invalid token
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    // Login Function
    const login = async (email, password) => {
        try {
            const res = await axios.post('https://kam-udaan.onrender.com/api/auth/login', { email, password });
            const { token: receivedToken, user } = res.data;
            localStorage.setItem('token', receivedToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${receivedToken}`;
            setUser(user);
            setToken(receivedToken); // Update token state
            setError('');
            return { success: true };
        } catch (err) {
            console.error('Login Error:', err);
            const message = err.response?.data?.message || 'Login failed';
            setError(message);
            return { success: false, message };
        }
    };

    // Register Function
    const register = async (name, email, password, timezone = 'UTC') => {
        try {
            const res = await axios.post('https://kam-udaan.onrender.com/api/auth/register', { name, email, password, timezone });
            const { token: receivedToken, user } = res.data;
            localStorage.setItem('token', receivedToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${receivedToken}`;
            setUser(user);
            setToken(receivedToken); // Update token state
            setError('');
            return { success: true };
        } catch (err) {
            console.error('Registration Error:', err);
            const message = err.response?.data?.message || 'Registration failed';
            setError(message);
            return { success: false, message };
        }
    };

    // Logout Function
    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        setToken(null); // Clear token state
        setError('');
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, error, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
