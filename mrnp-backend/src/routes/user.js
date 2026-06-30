const express = require('express');
const { 
  getProfile, 
  updateProfile, 
  changePassword,
  getAllowedEmails,
  addAllowedEmail,
  deleteAllowedEmail
} = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.put('/change-password', authenticateToken, changePassword);

router.get('/allowed-emails', authenticateToken, getAllowedEmails);
router.post('/allowed-emails', authenticateToken, addAllowedEmail);
router.delete('/allowed-emails/:id', authenticateToken, deleteAllowedEmail);

module.exports = router;

