const Interaction = require('../models/Interaction');
const Restaurant = require('../models/Restaurant');
const Contact  =require('../models/Contact')
// @desc    Get all interactions for a restaurant
// @route   GET /api/interactions/restaurant/:restaurantId
// @access  Private
exports.getInteractions = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        // Ensure the restaurant is assigned to the user
        if (restaurant.assignedTo.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Populate contactId and userId if needed
        const interactions = await Interaction.find({ restaurantId: req.params.restaurantId })
            .populate('restaurantId', 'name') // Populate restaurant name
            .populate('contactId', 'name role email phone') // Populate contact details
            .populate('userId', 'name email'); // Populate user details (optional)

        res.json(interactions);
    } catch (err) {
        console.error("Error in getInteractions:", err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};
// @desc    Get single interaction
// @route   GET /api/interactions/:id
// @access  Private
exports.getInteraction = async (req, res) => {
    try {
        const interaction = await Interaction.findById(req.params.id)
            .populate('restaurantId', 'name') // Populate restaurant name
            .populate('contactId', 'name role email phone') // Populate contact details
            .populate('userId', 'name email'); // Populate user details (optional)

        if (!interaction) {
            return res.status(404).json({ message: 'Interaction not found' });
        }

        const restaurant = await Restaurant.findById(interaction.restaurantId);

        // Ensure the restaurant is assigned to the user
        if (restaurant.assignedTo.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.json(interaction);
    } catch (err) {
        console.error("Error in getInteraction:", err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Create new interaction
// @route   POST /api/interactions
// @access  Private
exports.createInteraction = async (req, res) => {
    const { restaurantId, contactId, type, details, date } = req.body;

    try {
        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        // Ensure the restaurant is assigned to the user
        if (restaurant.assignedTo.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Validate contactId if provided
        let contact = null;
        if (contactId) {
            contact = await Contact.findById(contactId);
            if (!contact) {
                return res.status(404).json({ message: 'Contact not found' });
            }

            // Ensure the contact belongs to the specified restaurant
            if (contact.restaurantId.toString() !== restaurantId) {
                return res.status(400).json({ message: 'Contact does not belong to the specified restaurant' });
            }
        }

        const interaction = await Interaction.create({
            restaurantId,
            userId: req.user.id,
            contactId: contactId || undefined, // Assign contactId if provided
            type,
            details,
            date,
        });

        // Populate fields before sending response
        const populatedInteraction = await Interaction.findById(interaction._id)
            .populate('restaurantId', 'name')
            .populate('contactId', 'name role email phone')
            .populate('userId', 'name email');

        res.status(201).json(populatedInteraction);
    } catch (err) {
        console.error("Error in createInteraction:", err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};
// @desc    Update interaction
// @route   PUT /api/interactions/:id
// @access  Private
exports.updateInteraction = async (req, res) => {
    try {
        const interaction = await Interaction.findById(req.params.id);

        if (!interaction) {
            return res.status(404).json({ message: 'Interaction not found' });
        }

        const restaurant = await Restaurant.findById(interaction.restaurantId);

        // Ensure the restaurant is assigned to the user
        if (restaurant.assignedTo.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // If updating contactId, validate it
        if (req.body.contactId) {
            const contact = await Contact.findById(req.body.contactId);
            if (!contact) {
                return res.status(404).json({ message: 'Contact not found' });
            }

            // Ensure the contact belongs to the same restaurant
            if (contact.restaurantId.toString() !== interaction.restaurantId.toString()) {
                return res.status(400).json({ message: 'Contact does not belong to the same restaurant' });
            }
        }

        // Update the interaction
        const updatedInteraction = await Interaction.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('restaurantId', 'name')
            .populate('contactId', 'name role email phone')
            .populate('userId', 'name email');

        res.json(updatedInteraction);
    } catch (err) {
        console.error("Error in updateInteraction:", err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};
// @desc    Delete interaction
// @route   DELETE /api/interactions/:id
// @access  Private
exports.deleteInteraction = async (req, res) => {
    try {
        const interaction = await Interaction.findById(req.params.id);

        if (!interaction) {
            return res.status(404).json({ message: 'Interaction not found' });
        }

        const restaurant = await Restaurant.findById(interaction.restaurantId);

        // Ensure the restaurant is assigned to the user
        if (restaurant.assignedTo.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await Interaction.findByIdAndDelete(interaction._id);
        res.json({ message: 'Interaction removed' });
    } catch (err) {
        console.error("Error in deleteInteraction:", err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};