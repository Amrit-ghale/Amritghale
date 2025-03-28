const express = require('express');
const { trackVisitor, getVisitorStats } = require('../controller/analyticsController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/visitor', trackVisitor);
router.get('/visitors', protect, getVisitorStats);

module.exports = router;