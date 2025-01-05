const Contact = require('../models/Contact');
const Restaurant = require('../models/Restaurant');

// @desc    Get all contacts for a restaurant
// @route   GET /api/contacts/restaurant/:restaurantId
// @access  Private
exports.getContacts = async (req, res) => {
    try {
       // console.log(req.params.restaurantId);
        const restaurant = await Restaurant.findById(req.params.restaurantId);

        if(!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        // Ensure the restaurant is assigned to the user
        if(restaurant.assignedTo.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const contacts = await Contact.find({ restaurantId: req.params.restaurantId });
        res.json(contacts);
    } catch(err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Get single contact
// @route   GET /api/contacts/:id
// @access  Private
exports.getContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if(!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        const restaurant = await Restaurant.findById(contact.restaurantId);

        // Ensure the restaurant is assigned to the user
        if(restaurant.assignedTo.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.json(contact);
    } catch(err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Create new contact
// @route   POST /api/contacts
// @access  Private
exports.createContact = async (req, res) => {
    const { restaurantId, name, role, email, phone } = req.body;

    try {
        const restaurant = await Restaurant.findById(restaurantId);

        if(!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        // Ensure the restaurant is assigned to the user
        if(restaurant.assignedTo.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const contact = await Contact.create({
            restaurantId,
            name,
            role,
            email,
            phone,
        });

        res.status(201).json(contact);
    } catch(err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Update contact
// @route   PUT /api/contacts/:id
// @access  Private
exports.updateContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if(!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        const restaurant = await Restaurant.findById(contact.restaurantId);

        // Ensure the restaurant is assigned to the user
        if(restaurant.assignedTo.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.json(updatedContact);
    } catch(err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
// @access  Private
exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        const restaurant = await Restaurant.findById(contact.restaurantId);

        // Ensure the restaurant is assigned to the user
        if (restaurant.assignedTo.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Trigger pre('remove') middleware
        await Contact.findByIdAndDelete(contact._id);
        res.json({ message: 'Contact and associated interactions removed' });
    } catch (err) {
        console.error("Error deleting contact:", err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};