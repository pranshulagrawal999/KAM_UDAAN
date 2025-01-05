const express = require('express');
const router = express.Router();
const { getInteractions, getInteraction, createInteraction, updateInteraction, deleteInteraction } = require('../controllers/interactions');
const { protect } = require('../middleware/auth');

// Get All Interactions for a Restaurant
router.get('/restaurant/:restaurantId', protect, getInteractions);

// Get Single Interaction
router.get('/:id', protect, getInteraction);

// Create Interaction
router.post('/', protect, createInteraction);

// Update Interaction
router.put('/:id', protect, updateInteraction);

// Delete Interaction
router.delete('/:id', protect, deleteInteraction);

module.exports = router;
