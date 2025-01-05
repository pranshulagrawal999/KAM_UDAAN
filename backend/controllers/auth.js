const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
    const { name, email, password, role, timezone } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if(userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role,
            timezone,
        });

        if(user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }

    } catch(err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
      //  console.log(user)
        if(user && (await user.matchPassword(password))) {
            res.json({
                user : {_id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,},
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password'});
        }
    } catch(err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

