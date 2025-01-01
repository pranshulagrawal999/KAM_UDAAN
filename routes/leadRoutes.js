const express = require('express');
const { createLead, getLeads, updateLead, deleteLead,getLeadsRequiringCalls,updateLeadStatus } = require('../controllers/leadController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, authorize('admin', 'user'), createLead);
router.get('/',protect, authorize('admin', 'user'), getLeads);
router.put('/:id', protect, authorize('admin', 'user'), updateLead);
router.delete('/:id', protect, authorize('admin', 'user'), deleteLead);
router.get('/calls-today',protect, authorize('admin', 'user'), getLeadsRequiringCalls);
router.put('/:id/status', protect, authorize('admin', 'user'), updateLeadStatus);

module.exports = router;
