const Job = require('../models/Job');

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json({ jobs });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createJob = async (req, res) => {
  try {
    const { department, position, city, state, description, requirements } = req.body;

    if (!department || !position || !city || !state) {
      return res.status(400).json({ error: 'Department, Position, City, and State are required' });
    }

    const processedRequirements = Array.isArray(requirements)
      ? requirements
      : typeof requirements === 'string'
      ? requirements.split('\n').map(r => r.trim()).filter(Boolean)
      : [];

    const job = await Job.create({
      department,
      position,
      city,
      state,
      description: description || '',
      requirements: processedRequirements
    });

    res.status(201).json({
      message: 'Job opening posted successfully',
      job
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndDelete(id);
    if (!job) {
      return res.status(404).json({ error: 'Job opening not found' });
    }

    res.json({ message: 'Job opening deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getJobs,
  createJob,
  deleteJob
};
