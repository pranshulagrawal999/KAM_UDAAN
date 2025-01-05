// models/Interaction.js
const mongoose = require('mongoose');

const InteractionSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    contactId: { // Newly added field
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact',
        required: false, // Set to true if every interaction must have a contact
    },
    type: {
        type: String,
        enum: ['Call', 'Email', 'Order'],
        required: true,
    },
    details: String,
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

// Optional: Add indexes for performance optimization
InteractionSchema.index({ restaurantId: 1, type: 1, date: -1 });
InteractionSchema.index({ contactId: 1 });

module.exports = mongoose.model('Interaction', InteractionSchema);
