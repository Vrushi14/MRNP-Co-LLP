const express = require('express');
const {
  getNotifications,
  markRead,
  markAllRead,
  deleteNotification
} = require('../controllers/notificationController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, getNotifications);
router.put('/read-all', authenticateToken, markAllRead);
router.put('/:id/read', authenticateToken, markRead);
router.delete('/:id', authenticateToken, deleteNotification);

module.exports = router;
