const Interaction = require('../models/Interaction');
const Restaurant = require('../models/Restaurant');
const moment = require('moment-timezone');
const mongoose = require('mongoose');

// @desc    Get current month's performance metrics up to today
// @route   GET /api/performance
// @access  Private
exports.getPerformanceMetrics = async (req, res) => {
    try {
        // Define the start of the current month in UTC
        const today = moment.utc();
        const startOfMonth = today.clone().startOf('month').toDate();
        const endOfToday = today.clone().endOf('day').toDate();

        // Convert string userId to ObjectId
        const userObjectId = new mongoose.Types.ObjectId(req.user.id);

        // Add debug logging
        // console.log('Date Range:', {
        //     startOfMonth,
        //     endOfToday,
        //     userId: userObjectId
        // });

        // Aggregate interactions per restaurant for the current month up to today
        const orders = await Interaction.aggregate([
            {
                $match: {
                    userId: userObjectId,  // Use ObjectId instead of string
                    date: {
                        $exists: true,
                        $ne: null,
                        $gte: startOfMonth,
                        $lte: endOfToday
                    }
                }
            },
            {
                $group: {
                    _id: '$restaurantId',
                    totalInteractions: { $sum: 1 },
                    types: { $push: '$type' }
                }
            }
        ]);

        //console.log('Aggregation results:', orders);

        if (!orders || orders.length === 0) {
            return res.json({
                wellPerforming: [],
                underPerforming: [],
                message: 'No interactions found for the current month up to today.'
            });
        }

        // Rest of the code remains the same
        const restaurantIds = orders.map(order => order._id);
        const restaurants = await Restaurant.find({ _id: { $in: restaurantIds } });

        const restaurantMap = {};
        restaurants.forEach(restaurant => {
            restaurantMap[restaurant._id.toString()] = restaurant;
        });

        const wellPerforming = [];
        const underPerforming = [];

        const WELL_PERFORMING_THRESHOLD = 3;
        const UNDER_PERFORMING_THRESHOLD = 3;

        orders.forEach(order => {
            const restaurant = restaurantMap[order._id.toString()];
            if (!restaurant) {
                console.log('Missing restaurant for ID:', order._id);
                return;
            }

            if(order.totalInteractions >= WELL_PERFORMING_THRESHOLD) {
                wellPerforming.push({
                    _id: restaurant._id,
                    name: restaurant.name,
                    interactions: order.totalInteractions
                });
            } else if(order.totalInteractions < UNDER_PERFORMING_THRESHOLD) {
                underPerforming.push({
                    _id: restaurant._id,
                    name: restaurant.name,
                    interactions: order.totalInteractions
                });
            }
        });
        console.log("well perfomanance", wellPerforming)
        console.log("under Perfomanance",underPerforming)
        res.json({ 
            wellPerforming, 
            underPerforming,
            debug: {
                totalOrders: orders.length,
                dateRange: { startOfMonth, endOfToday }
            }
        });
    } catch(err) {
        console.error("Error fetching performance metrics:", err);
        res.status(500).json({ 
            message: 'Server Error', 
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
};