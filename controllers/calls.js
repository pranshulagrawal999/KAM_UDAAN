// controllers/performanceController.js

const Interaction = require('../models/Interaction');
const Restaurant = require('../models/Restaurant');
const Contact = require('../models/Contact');
const User = require('../models/User');
const moment = require('moment-timezone');

// @desc    Get today's interactions (calls, emails, orders) for the logged-in user
// @route   GET /api/calls/today
// @access  Private
exports.getTodaysCalls = async (req, res) => {
    try {
        // Fetch user and timezone
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const timezone = user.timezone || 'UTC';

        // Get start and end of the day for the user's timezone
        const startOfDay = moment().tz(timezone).startOf('day').toDate();
        const endOfDay = moment().tz(timezone).endOf('day').toDate();

        // Fetch all types of interactions for today
        const interactions = await Interaction.find({
            userId: req.user.id,
            type: { $in: ['Call', 'Email', 'Order'] }, // Include all interaction types
            date: { $gte: startOfDay, $lte: endOfDay },
        })
        .sort({ date: 1 }) // Sort by date in ascending order
        .populate('restaurantId', 'name')
        .populate('contactId', 'name');

        // Map interactions to the desired structure
        let todaysInteractions = interactions.map(interaction => ({
            _id: interaction._id,
            type: interaction.type,
            restaurantName: interaction.restaurantId ? interaction.restaurantId.name : 'Unknown Restaurant',
            contactName: interaction.contactId ? interaction.contactId.name : 'Unknown Contact',
            time: interaction.date ? moment(interaction.date).tz(timezone).format('HH:mm') : 'N/A',
            details: interaction.details || '',
            status: moment().tz(timezone).isAfter(moment(interaction.date)) ? 'Completed' : 'Pending'
        }));

        // **Filtering Out "Unknown Restaurant" and "Unknown Contact" Interactions**
        todaysInteractions = todaysInteractions.filter(interaction => 
            interaction.restaurantName !== 'Unknown Restaurant' &&
            interaction.contactName !== 'Unknown Contact'
        );

        // Group interactions by type after filtering
        const groupedInteractions = {
            calls: todaysInteractions.filter(i => i.type === 'Call'),
            emails: todaysInteractions.filter(i => i.type === 'Email'),
            orders: todaysInteractions.filter(i => i.type === 'Order')
        };

        // Add counts for each type
        const summary = {
            totalInteractions: todaysInteractions.length,
            callsCount: groupedInteractions.calls.length,
            emailsCount: groupedInteractions.emails.length,
            ordersCount: groupedInteractions.orders.length,
            completedCount: todaysInteractions.filter(i => i.status === 'Completed').length,
            pendingCount: todaysInteractions.filter(i => i.status === 'Pending').length
        };

        // **Fetching Performance Metrics**
        const performance = await getPerformanceMetrics(req.user.id);

        res.json({
            interactions: todaysInteractions,
            grouped: groupedInteractions,
            summary: summary,
            timezone: timezone,
            performanceMetrics: performance
        });

    } catch(err) {
        console.error("Error in getTodaysCalls:", err);
        res.status(500).json({ 
            message: 'Server Error', 
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined 
        });
    }
};

/**
 * Helper function to fetch and filter performance metrics
 * Excludes any restaurant named "Unknown Restaurant" and interactions with "Unknown Contact"
 */
const getPerformanceMetrics = async (userId) => {
    try {
        // Define the start of the current month in UTC
        const today = moment.utc();
        const startOfMonth = today.clone().startOf('month').toDate();

        // Define the end of the current day in UTC
        const endOfToday = today.clone().endOf('day').toDate();

        // Define interaction types to include
        const interactionTypes = ['Order', 'Call', 'Email'];

        // Aggregate interactions per restaurant for the current month up to today
        const orders = await Interaction.aggregate([
            { 
                $match: { 
                    userId: userId,
                    type: { $in: interactionTypes },
                    date: { 
                        $gte: startOfMonth,
                        $lte: endOfToday
                    },
                }
            },
            // Lookup to 'Contact' to get 'contactName'
            {
                $lookup: {
                    from: 'contacts', // Collection name in MongoDB is usually lowercase plural
                    localField: 'contactId',
                    foreignField: '_id',
                    as: 'contact'
                }
            },
            // Unwind the 'contact' array
            { $unwind: { path: '$contact', preserveNullAndEmptyArrays: true } },
            // Exclude interactions where contactName is 'Unknown Contact'
            {
                $match: {
                    'contact.name': { $ne: 'Unknown Contact' }
                }
            },
            {
                $group: {
                    _id: '$restaurantId',
                    totalInteractions: { $sum: 1 },
                }
            }
        ]);

        if (!orders || orders.length === 0) {
            return { 
                wellPerforming: [], 
                underPerforming: [],
                message: 'No interactions found for the current month up to today.'
            };
        }

        // Extract all restaurant IDs from the aggregation result
        const restaurantIds = orders.map(order => order._id);

        // Fetch all relevant restaurants in a single query
        const restaurants = await Restaurant.find({ _id: { $in: restaurantIds } });

        // Create a map for quick lookup of restaurant details
        const restaurantMap = {};
        restaurants.forEach(restaurant => {
            restaurantMap[restaurant._id.toString()] = restaurant;
        });

        let wellPerforming = [];
        let underPerforming = [];

        // Define thresholds
        const WELL_PERFORMING_THRESHOLD = 10; // Adjust as needed
        const UNDER_PERFORMING_THRESHOLD = 5;  // Adjust as needed

        orders.forEach(order => {
            const restaurant = restaurantMap[order._id.toString()];
            if (!restaurant) {
                // Handle cases where the restaurant might have been deleted
                return;
            }

            if(order.totalInteractions >= WELL_PERFORMING_THRESHOLD) { // Well-performing
                wellPerforming.push({ 
                    _id: restaurant._id, 
                    name: restaurant.name, 
                    interactions: order.totalInteractions 
                });
            } else if(order.totalInteractions >= UNDER_PERFORMING_THRESHOLD && order.totalInteractions < WELL_PERFORMING_THRESHOLD) { // Underperforming
                underPerforming.push({ 
                    _id: restaurant._id, 
                    name: restaurant.name, 
                    interactions: order.totalInteractions 
                });
            }
            // You can add more categories if needed
        });

        // **Filtering Out "Unknown Restaurant" from Performance Metrics**
        wellPerforming = wellPerforming.filter(account => account.name !== 'Unknown Restaurant');
        underPerforming = underPerforming.filter(account => account.name !== 'Unknown Restaurant');

        return { wellPerforming, underPerforming };
    } catch(err) {
        console.error("Error fetching performance metrics:", err);
        return { 
            wellPerforming: [], 
            underPerforming: [],
            message: 'Error fetching performance metrics.'
        };
    }
};
