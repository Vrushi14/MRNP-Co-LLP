const express = require('express');
const { sendEmail, getEmailLogs, getAllEmailLogs } = require('../controllers/emailController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, getAllEmailLogs);
router.post('/send', authenticateToken, sendEmail);
router.get('/history/:applicantId', authenticateToken, getEmailLogs);

module.exports = router;

