// models/Contact.js
const mongoose = require('mongoose');
const Interaction = require('./Interaction');

const ContactSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    role: String, // e.g., Manager, Owner
    email: String,
    phone: String,
}, { timestamps: true });

// Pre-remove middleware to delete associated interactions
ContactSchema.pre('remove', async function(next) {
    try {
        // Delete all interactions associated with this contact
        await Interaction.deleteMany({ contactId: this._id });
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('Contact', ContactSchema);
