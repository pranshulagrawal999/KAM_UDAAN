const express = require('express');
const router = express.Router();
const { getRestaurants, getRestaurant, createRestaurant, updateRestaurant, deleteRestaurant } = require('../controllers/restaurants');
const { protect } = require('../middleware/auth');

// Get All Restaurants
router.get('/', protect, getRestaurants);

// Get Single Restaurant
router.get('/:id', protect, getRestaurant);

// Create Restaurant
router.post('/', protect, createRestaurant);

// Update Restaurant
router.put('/:id', protect, updateRestaurant);

// Delete Restaurant
router.delete('/:id', protect, deleteRestaurant);

module.exports = router;
