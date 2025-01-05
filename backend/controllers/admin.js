const Restaurant = require('../models/Restaurant');
const User = require('../models/User');

// @desc    Reassign restaurants from one KAM to another
// @route   POST /api/admin/reassign
// @access  Private/Admin
exports.reassignRestaurants = async (req, res) => {
    const { fromKAMId, toKAMId } = req.body;

    try {
        const fromKAM = await User.findById(fromKAMId);
        const toKAM = await User.findById(toKAMId);

        if(!fromKAM || !toKAM) {
            return res.status(404).json({ message: 'KAM not found' });
        }

        const result = await Restaurant.updateMany(
            { assignedTo: fromKAMId },
            { assignedTo: toKAMId }
        );

        res.json({ message: `${result.nModified} restaurants reassigned to ${toKAM.name}` });
    } catch(err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};
