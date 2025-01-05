const express = require('express');
const router = express.Router();
const { getContacts, getContact, createContact, updateContact, deleteContact } = require('../controllers/contacts');
const { protect } = require('../middleware/auth');

// Get All Contacts for a Restaurant
router.get('/restaurant/:restaurantId', protect, getContacts);

// Get Single Contact
router.get('/:id', protect, getContact);

// Create Contact
router.post('/', protect, createContact);

// Update Contact
router.put('/:id', protect, updateContact);

// Delete Contact
router.delete('/:id', protect, deleteContact);

module.exports = router;
