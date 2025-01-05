import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Phone, Mail, ShoppingCart } from 'lucide-react';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [dashboardData, setDashboardData] = useState({
        interactions: [],
        grouped: {
            calls: [],
            emails: [],
            orders: []
        },
        summary: {
            totalInteractions: 0,
            callsCount: 0,
            emailsCount: 0,
            ordersCount: 0,
            completedCount: 0,
            pendingCount: 0
        }
    });
    const [performanceMetrics, setPerformanceMetrics] = useState({
        wellPerforming: [],
        underPerforming: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const resCalls = await axios.get('https://kam-udaan.onrender.com/api/calls/today');
                setDashboardData(resCalls.data);
                const resPerformance = await axios.get('https://kam-udaan.onrender.com/api/performance');
                setPerformanceMetrics(resPerformance.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load dashboard data.');
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const getStatusBadge = (status) => {
        return status === 'Completed' ? 
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-200 text-green-700">Completed</span> :
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-200 text-yellow-700">Pending</span>;
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'Call':
                return <Phone className="w-5 h-5 text-blue-600" />;
            case 'Email':
                return <Mail className="w-5 h-5 text-blue-600" />;
            case 'Order':
                return <ShoppingCart className="w-5 h-5 text-blue-600" />;
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-blue-50">
                <div className="text-xl font-semibold text-blue-600 animate-pulse">
                    Loading Dashboard...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-blue-50">
                <div className="text-xl font-semibold text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-8">
            <h2 className="text-4xl font-extrabold text-blue-800 mb-8 border-b-4 border-blue-300 pb-2">
                Dashboard
            </h2>

            {/* Summary Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-md border-l-8 border-blue-400">
                    <div className="text-lg font-semibold text-gray-800">Today's Summary</div>
                    <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-gray-600">
                            <span>Total Tasks:</span>
                            <span className="font-medium text-gray-900">{dashboardData.summary.totalInteractions}</span>
                        </div>
                        <div className="flex justify-between text-blue-600">
                            <span>Completed:</span>
                            <span className="font-medium">{dashboardData.summary.completedCount}</span>
                        </div>
                        <div className="flex justify-between text-yellow-600">
                            <span>Pending:</span>
                            <span className="font-medium">{dashboardData.summary.pendingCount}</span>
                        </div>
                    </div>
                </div>
            </div>

            <section className="mb-8">
                <h3 className="text-2xl font-semibold text-blue-700 mb-6">Today's Tasks</h3>
                {dashboardData.interactions.length === 0 ? (
                    <p className="text-gray-500">No tasks scheduled for today.</p>
                ) : (
                    <ul className="space-y-4">
                        {dashboardData.interactions.map(interaction => (
                            <li
                                key={interaction._id}
                                className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md border-l-4 border-blue-500 hover:bg-blue-50 transition-all"
                            >
                                <div className="flex items-center space-x-4">
                                    {getTypeIcon(interaction.type)}
                                    <span className="font-medium text-gray-800">{interaction.restaurantName}</span>
                                    {getStatusBadge(interaction.status)}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {interaction.contactName} | {interaction.time}
                                    {interaction.details && (
                                        <span className="text-gray-400"> ({interaction.details})</span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section>
                <h3 className="text-2xl font-semibold text-blue-700 mb-6">Performance Metrics</h3>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                        <h4 className="text-xl font-medium text-gray-800 mb-4">Well-Performing Accounts</h4>
                        {performanceMetrics.wellPerforming.length === 0 ? (
                            <p className="text-gray-500">No well-performing accounts.</p>
                        ) : (
                            <ul className="space-y-3">
                                {performanceMetrics.wellPerforming.map(account => (
                                    <li
                                        key={account._id}
                                        className="flex justify-between items-center py-2 border-b border-gray-200 hover:bg-gray-50"
                                    >
                                        <span className="font-medium text-gray-800">{account.name}</span>
                                        <span className="text-gray-600">Interactions: {account.interactions}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                        <h4 className="text-xl font-medium text-gray-800 mb-4">Underperforming Accounts</h4>
                        {performanceMetrics.underPerforming.length === 0 ? (
                            <p className="text-gray-500">No underperforming accounts.</p>
                        ) : (
                            <ul className="space-y-3">
                                {performanceMetrics.underPerforming.map(account => (
                                    <li
                                        key={account._id}
                                        className="flex justify-between items-center py-2 border-b border-gray-200 hover:bg-gray-50"
                                    >
                                        <span className="font-medium text-gray-800">{account.name}</span>
                                        <span className="text-gray-600">Interactions: {account.interactions}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
