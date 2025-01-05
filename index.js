const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors({
    
    origin: '*', // Frontend URL
    
}));

app.use(express.json());

// Import Routes
const authRoutes = require('./routes/auth');
const restaurantRoutes = require('./routes/restaurants');
const contactRoutes = require('./routes/contacts');
const interactionRoutes = require('./routes/interactions');
const callRoutes = require('./routes/calls');
const performanceRoutes = require('./routes/performance');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/interactions', interactionRoutes);
app.use('/api/calls', callRoutes);
app.use('/api/performance', performanceRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
