const mongoose = require('mongoose');

const InteractionSchema = new mongoose.Schema({
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
    date: { type: Date, default: Date.now },
    type: { type: String, enum: ['Call', 'Visit', 'Order'], required: true },
    notes: { type: String },
    followUp: { type: Boolean, default: false },
    orderValue: { type: Number, default: 0 }, // Track order values
}, { timestamps: true });

module.exports = mongoose.model('Interaction', InteractionSchema);
