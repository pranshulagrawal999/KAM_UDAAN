const express = require('express');
const { body } = require('express-validator');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// User registration
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  registerUser
);

// User login
router.post('/login', loginUser);

// Get current user profile
router.get('/profile', protect, getUserProfile);

module.exports = router;
