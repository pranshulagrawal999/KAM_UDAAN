const express = require('express');
const router = express.Router();
const { getPerformanceMetrics } = require('../controllers/performance');
const { protect } = require('../middleware/auth');

// Get Performance Metrics
router.get('/', protect, getPerformanceMetrics);

module.exports = router;
