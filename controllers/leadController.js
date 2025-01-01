const Lead = require('../models/Lead'); // Ensure the path is correct

// Create a new lead
exports.createLead = async (req, res) => {
  try {
    // Destructure values from the request body
    const { name, address, contactNumber, status, assignedKAM, callFrequency, lastCallDate } = req.body;

    // Ensure all required fields are provided
    if (!name || !address || !contactNumber || !status || !assignedKAM || !callFrequency) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Set lastCallDate to null if not provided
    const newLead = new Lead({
      name,
      address,
      contactNumber,
      status,
      assignedKAM,
      callFrequency,
      lastCallDate: lastCallDate ? new Date(lastCallDate) : null, // Handle the case where lastCallDate might be missing
    });

    // Save the lead to the database
    const savedLead = await newLead.save();

    // Send response with the saved lead data
    res.status(201).json(savedLead);
  } catch (error) {
    console.error("Error creating lead:", error); // Log the error for better debugging
    res.status(500).json({ message: error.message });
  }
};


// Get All Leads
exports.getLeads = async (req, res) => {
    try {
        const leads = await Lead.find();
        res.status(200).json(leads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update Lead
exports.updateLead = async (req, res) => {
    try {
        const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(lead);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete Lead
exports.deleteLead = async (req, res) => {
    try {
        await Lead.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Lead deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getLeadsRequiringCalls = async (req, res) => {
    // try {
    //   const today = new Date();
    //   const leadsToCall = await Lead.find({
    //     $or: [
    //       { lastCallDate: { $exists: false } },
    //       {
    //         lastCallDate: {
    //           $lt: new Date(today.getTime() - callFrequency * 24 * 60 * 60 * 1000),
    //         },
    //       },
    //     ],
    //   });
    //   res.status(200).json(leadsToCall);
    // } catch (error) {
    //   res.status(500).json({ message: error.message });
    // }
    try {
      // Get today's date in the right format (remove time part)
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset to midnight to only compare date part
  
      // Query leads that need a call today
      const leadsToCallToday = await Lead.find({
        lastCallDate: { $lt: today },
        callFrequency: { $gt: 0 } // Only get leads that require calls (callFrequency > 0)
      });
  
      // If no leads found
      if (!leadsToCallToday || leadsToCallToday.length === 0) {
        return res.status(200).json({ message: "No leads need a call today." });
      }
  
      // Respond with the leads that need a call today
      res.status(200).json(leadsToCallToday);
    } catch (error) {
      console.error("Error getting calls today:", error);
      res.status(500).json({ message: "Error retrieving leads", error: error.message });
    }
  };

  exports.updateLeadStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    if (!['New', 'Active', 'Inactive'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
  
    try {
      const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true });
      if (!lead) {
        return res.status(404).json({ message: 'Lead not found' });
      }
  
      res.status(200).json(lead);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  