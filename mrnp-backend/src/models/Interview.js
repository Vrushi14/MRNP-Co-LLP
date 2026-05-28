const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema(
  {
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CareerApplication',
      required: true,
    },
    interviewer: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: Number, default: 45 }, // in minutes
    meetingLink: { type: String, required: true },
    notes: { type: String, default: '' },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled'],
      default: 'scheduled',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Interview', interviewSchema);
