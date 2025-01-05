const mongoose = require('mongoose');
const Interaction = require('./Interaction');
const Contact = require('./Contact');
const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: String,
    city: String,
    state: String,
    zipcode: String,
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Negotiation', 'Closed'],
        default: 'New',
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });

RestaurantSchema.pre('remove', async function(next) {
    try {
        // Delete all interactions associated with this restaurant
        await Interaction.deleteMany({ restaurantId: this._id });
        
        // Delete all contacts associated with this restaurant
        await Contact.deleteMany({ restaurantId: this._id });
        
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
