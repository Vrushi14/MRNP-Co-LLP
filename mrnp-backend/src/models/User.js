const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      default: 'Founding Partner',
    },
    icaiMembership: {
      type: String,
      default: '124567',
    },
    memberSince: {
      type: String,
      default: 'March 2004',
    },
    officeBranch: {
      type: String,
      default: 'Mumbai - HQ',
    },
    phone: {
      type: String,
      default: '+91 98200 00001',
    },
    linkedin: {
      type: String,
      default: 'https://linkedin.com',
    },
    location: {
      type: String,
      default: 'Mumbai, MH',
    },
    badge: {
      type: String,
      default: 'FCA',
    },
    teamAssigned: {
      type: String,
      default: 'Audit team · Tax team',
    },
    joinedFirm: {
      type: String,
      default: '1 April 2002',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
