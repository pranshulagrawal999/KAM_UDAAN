const express = require('express');
const { getPerformanceMetrics } = require('../controllers/performanceController');
const router = express.Router();

router.get('/metrics', getPerformanceMetrics);

module.exports = router;
