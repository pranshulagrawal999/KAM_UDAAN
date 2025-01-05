const Restaurant = require('../models/Restaurant');

// @desc    Get all restaurants
// @route   GET /api/restaurants
// @access  Private
exports.getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find({ assignedTo: req.user.id });
        res.json(restaurants);
    } catch(err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Get single restaurant
// @route   GET /api/restaurants/:id
// @access  Private
exports.getRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if(!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        // Ensure the restaurant is assigned to the user
        if(restaurant.assignedTo.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.json(restaurant);
    } catch(err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Create new restaurant
// @route   POST /api/restaurants
// @access  Private
exports.createRestaurant = async (req, res) => {
    const { name, address, city, state, zipcode, status } = req.body;

    try {
        const restaurant = await Restaurant.create({
            name,
            address,
            city,
            state,
            zipcode,
            status,
            assignedTo: req.user.id,
        });

        res.status(201).json(restaurant);
    } catch(err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Update restaurant
// @route   PUT /api/restaurants/:id
// @access  Private
exports.updateRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if(!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        // Ensure the restaurant is assigned to the user
        if(restaurant.assignedTo.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.json(updatedRestaurant);
    } catch(err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Delete restaurant
// @route   DELETE /api/restaurants/:id
// @access  Private
exports.deleteRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        // Ensure the restaurant is assigned to the user
        if (restaurant.assignedTo.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Trigger pre('remove') middleware
        await Restaurant.findByIdAndDelete(restaurant._id)

        res.json({ message: 'Restaurant and associated interactions and contacts removed' });
    } catch (err) {
        console.error("Error deleting restaurant:", err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};
