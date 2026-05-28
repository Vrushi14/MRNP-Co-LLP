const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    department: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    requirements: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
