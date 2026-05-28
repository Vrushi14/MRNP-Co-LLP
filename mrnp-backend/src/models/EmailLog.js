const mongoose = require('mongoose');

const emailLogSchema = new mongoose.Schema(
  {
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CareerApplication',
      required: true
    },
    recipientEmail: {
      type: String,
      required: true,
      trim: true
    },
    subject: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['interview', 'rejection', 'offer'],
      required: true
    },
    status: {
      type: String,
      default: 'sent'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('EmailLog', emailLogSchema);
