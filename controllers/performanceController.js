const Interaction = require('../models/Interaction');
const Lead = require('../models/Lead');

// Get performance metrics
exports.getPerformanceMetrics = async (req, res) => {
  try {
    const interactions = await Interaction.aggregate([
      {
        $group: {
          _id: '$restaurantId',
          interactionCount: { $sum: 1 },
          lastInteractionDate: { $max: '$date' },
        },
      },
      { $sort: { interactionCount: -1 } },
    ]);

    const highPerformingAccounts = interactions.filter(account => account.interactionCount >= 5);
    const underPerformingAccounts = interactions.filter(account => account.interactionCount < 2);

    res.status(200).json({
      totalLeads: await Lead.countDocuments(),
      highPerformingAccounts,
      underPerformingAccounts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
