const express = require('express');
const { createContact, getContactsByRestaurant, updateContact, deleteContact } = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

// Create a new contact for a restaurant
router.post('/', protect, authorize('admin', 'user'),createContact);

// Get all contacts for a specific restaurant
router.get('/:restaurantId', getContactsByRestaurant);

// Update a contact by ID
router.put('/:id',protect, authorize('admin', 'user'), updateContact);

// Delete a contact by ID
router.delete('/:id',protect, authorize('admin', 'user'), deleteContact);

module.exports = router;
