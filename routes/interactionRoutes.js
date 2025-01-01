const express = require('express');
const { createInteraction, getInteractionsByRestaurant, updateInteraction, deleteInteraction } = require('../controllers/interactionController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

// Create a new interaction for a restaurant
router.post('/',protect, authorize('admin', 'user'), createInteraction);

// Get all interactions for a specific restaurant
router.get('/:restaurantId',protect, authorize('admin', 'user'), getInteractionsByRestaurant);

// Update an interaction by ID
router.put('/:id',protect, authorize('admin', 'user'), updateInteraction);

// Delete an interaction by ID
router.delete('/:id',protect, authorize('admin', 'user'), deleteInteraction);

module.exports = router;
