const express = require('express');
const {
  getInterviews,
  scheduleInterview,
  updateInterview,
  cancelInterview
} = require('../controllers/interviewController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, getInterviews);
router.post('/', authenticateToken, scheduleInterview);
router.put('/:id', authenticateToken, updateInterview);
router.delete('/:id', authenticateToken, cancelInterview);

module.exports = router;
