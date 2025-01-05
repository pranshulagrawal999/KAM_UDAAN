const express = require('express');
const router = express.Router();
const { getTodaysCalls } = require('../controllers/calls');
const { protect } = require('../middleware/auth');

// Get Today's Calls
router.get('/today', protect, getTodaysCalls);

module.exports = router;
