const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const leadRoutes = require('./routes/leadRoutes');
const contactRoutes = require('./routes/contactRoutes');
const interactionRoutes = require('./routes/interactionRoutes');
const performanceRoutes = require('./routes/performanceRoutes');
const userRoutes = require('./routes/userRoutes');



dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api/leads', leadRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/interactions', interactionRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
