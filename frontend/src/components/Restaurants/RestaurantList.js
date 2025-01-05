import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const res = await axios.get('https://kam-udaan.onrender.com/api/restaurants');
                setRestaurants(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load restaurants.');
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-blue-600 text-xl font-semibold">
                    Loading Restaurants...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-blue-600 text-xl font-semibold">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-600">
                        Restaurants
                    </h1>
                    <Link
                        to="/restaurants/new"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                    >
                        Add New Restaurant
                    </Link>
                </div>

                {restaurants.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                        <p className="text-gray-500 text-lg">
                            No restaurants found.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {restaurants.map(restaurant => (
                            <Link
                                to={`/restaurants/${restaurant._id}`}
                                key={restaurant._id}
                                className="block bg-white rounded-lg shadow-sm hover:shadow-md transition duration-300 ease-in-out overflow-hidden cursor-pointer"
                            >
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-blue-600 mb-2">
                                        {restaurant.name}
                                    </h2>
                                    <div className="flex items-center">
                                        <span className="text-gray-600 font-medium">Status:</span>
                                        <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                                            restaurant.status === 'Open' 
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-50 text-red-600'
                                        }`}>
                                            {restaurant.status}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RestaurantList;
