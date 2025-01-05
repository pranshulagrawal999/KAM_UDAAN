// src/App.js

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute'; // Ensure correct path

// Layout Components
import Header from './components/Layout/Header';

// Lazy-loaded Pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Home = lazy(() => import('./pages/Home'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Restaurants
const RestaurantList = lazy(() => import('./components/Restaurants/RestaurantList'));
const RestaurantDetail = lazy(() => import('./components/Restaurants/RestaurantDetail'));
const RestaurantForm = lazy(() => import('./components/Restaurants/RestaurantForm'));

// Contacts
const ContactDetail = lazy(() => import('./components/Contacts/ContactDetail'));
const ContactForm = lazy(() => import('./components/Contacts/ContactForm'));

// Interactions
const InteractionDetail = lazy(() => import('./components/Interactions/InteractionDetail'));
const InteractionForm = lazy(() => import('./components/Interactions/InteractionForm'));

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <main>
                    <Suspense fallback={<div className="flex items-center justify-center h-screen text-blue-600">Loading...</div>}>
                        <Routes>
                            {/* Home Route */}
                            <Route path="/" element={<Home />} />

                            {/* Public Routes */}
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />

                            {/* Protected Routes */}
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />

                            {/* Restaurants */}
                            <Route
                                path="/restaurants"
                                element={
                                    <ProtectedRoute>
                                        <RestaurantList />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/restaurants/new"
                                element={
                                    <ProtectedRoute>
                                        <RestaurantForm />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/restaurants/edit/:id"
                                element={
                                    <ProtectedRoute>
                                        <RestaurantForm />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/restaurants/:id"
                                element={
                                    <ProtectedRoute>
                                        <RestaurantDetail />
                                    </ProtectedRoute>
                                }
                            />

                            {/* Contacts */}
                            <Route
                                path="/restaurants/:restaurantId/contacts/new"
                                element={
                                    <ProtectedRoute>
                                        <ContactForm />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/contacts/:id"
                                element={
                                    <ProtectedRoute>
                                        <ContactDetail />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/contacts/edit/:id"
                                element={
                                    <ProtectedRoute>
                                        <ContactForm />
                                    </ProtectedRoute>
                                }
                            />

                            {/* Interactions */}
                            <Route
                                path="/restaurants/:restaurantId/interactions/new"
                                element={
                                    <ProtectedRoute>
                                        <InteractionForm />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/interactions/:id"
                                element={
                                    <ProtectedRoute>
                                        <InteractionDetail />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/interactions/edit/:id"
                                element={
                                    <ProtectedRoute>
                                        <InteractionForm />
                                    </ProtectedRoute>
                                }
                            />

                            {/* Fallback Route */}
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </Suspense>
                </main>
                {/* <Footer /> */}
            </Router>
        </AuthProvider>
    );
};

export default App;

