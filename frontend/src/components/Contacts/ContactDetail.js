import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';

const ContactDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const res = await axios.get(`https://kam-udaan.onrender.com/api/contacts/${id}`);
                setContact(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load contact details.');
                setLoading(false);
            }
        };

        fetchContact();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            try {
                await axios.delete(`https://kam-udaan.onrender.com/api/contacts/${id}`);
                navigate(-1);
            } catch (err) {
                console.error(err);
                alert('Failed to delete contact.');
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-blue-600 text-xl font-semibold">
                    Loading Contact...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-blue-50 border border-blue-200 text-blue-600 px-6 py-4 rounded-lg">
                    {error}
                </div>
            </div>
        );
    }

    if (!contact) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-600 text-xl">
                    No contact found.
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {/* Contact Header */}
                    <div className="bg-blue-600 px-6 py-4">
                        <h2 className="text-2xl font-bold text-white">{contact.name}</h2>
                    </div>

                    {/* Contact Details */}
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <p className="text-sm text-gray-500">Role</p>
                                <p className="text-lg text-gray-900">{contact.role}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="text-lg text-gray-900">{contact.email}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="text-lg text-gray-900">{contact.phone}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-4 pt-6 border-t">
                            <Link
                                to={`/contacts/edit/${contact._id}`}
                                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150 ease-in-out text-center"
                            >
                                Edit Contact
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="flex-1 bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium border border-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150 ease-in-out"
                            >
                                Delete Contact
                            </button>
                        </div>
                    </div>
                </div>

                {/* Back Button */}
                <div className="mt-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-gray-600 hover:text-blue-600 text-sm font-medium flex items-center"
                    >
                        <span>← Back to Contacts</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactDetail;
