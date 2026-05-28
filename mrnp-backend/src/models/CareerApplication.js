const mongoose = require('mongoose');

const careerApplicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    education: { type: String, required: true },
    currentCompany: { type: String, default: null },
    experience: { type: String, required: true },
    resumePath: { type: String, required: true },
    jobDepartment: { type: String, required: true },
    jobPosition: { type: String, required: true },
    jobCity: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CareerApplication', careerApplicationSchema);
