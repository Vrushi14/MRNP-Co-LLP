const express = require('express');
const { getJobs, createJob, deleteJob } = require('../controllers/jobController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', getJobs);
router.post('/', authenticateToken, createJob);
router.delete('/:id', authenticateToken, deleteJob);

module.exports = router;
