const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    restaurantId: { type: mongoose.Schema.Types.ObjectId,
         ref: 'Lead',
        required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);
