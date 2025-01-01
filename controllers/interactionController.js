const Interaction = require('../models/Interaction');

// Create a new interaction
exports.createInteraction = async (req, res) => {
    try {
        const interaction = new Interaction(req.body);
        await interaction.save();
        res.status(201).json(interaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all interactions for a specific restaurant
exports.getInteractionsByRestaurant = async (req, res) => {
    try {
        const interactions = await Interaction.find({ restaurantId: req.params.restaurantId }).sort({ date: -1 });
        res.status(200).json(interactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an interaction by ID
exports.updateInteraction = async (req, res) => {
    try {
        const interaction = await Interaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!interaction) return res.status(404).json({ message: 'Interaction not found' });
        res.status(200).json(interaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an interaction by ID
exports.deleteInteraction = async (req, res) => {
    try {
        const interaction = await Interaction.findByIdAndDelete(req.params.id);
        if (!interaction) return res.status(404).json({ message: 'Interaction not found' });
        res.status(200).json({ message: 'Interaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
