const User = require('../models/User');
const AllowedEmail = require('../models/AllowedEmail');
const bcrypt = require('bcryptjs');

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        designation: user.designation || 'Founding Partner',
        icaiMembership: user.icaiMembership || '124567',
        memberSince: user.memberSince || 'March 2004',
        officeBranch: user.officeBranch || 'Mumbai - HQ',
        phone: user.phone || '+91 98200 00001',
        linkedin: user.linkedin || 'https://linkedin.com',
        location: user.location || 'Mumbai, MH',
        badge: user.badge || 'FCA',
        teamAssigned: user.teamAssigned || 'Audit team · Tax team',
        joinedFirm: user.joinedFirm || '1 April 2002',
        created_at: user.createdAt,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { 
      name, 
      email,
      designation,
      icaiMembership,
      memberSince,
      officeBranch,
      phone,
      linkedin,
      location,
      badge,
      teamAssigned,
      joinedFirm
    } = req.body;

    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email.toLowerCase();
    if (designation !== undefined) updateFields.designation = designation;
    if (icaiMembership !== undefined) updateFields.icaiMembership = icaiMembership;
    if (memberSince !== undefined) updateFields.memberSince = memberSince;
    if (officeBranch !== undefined) updateFields.officeBranch = officeBranch;
    if (phone !== undefined) updateFields.phone = phone;
    if (linkedin !== undefined) updateFields.linkedin = linkedin;
    if (location !== undefined) updateFields.location = location;
    if (badge !== undefined) updateFields.badge = badge;
    if (teamAssigned !== undefined) updateFields.teamAssigned = teamAssigned;
    if (joinedFirm !== undefined) updateFields.joinedFirm = joinedFirm;

    const user = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        designation: user.designation,
        icaiMembership: user.icaiMembership,
        memberSince: user.memberSince,
        officeBranch: user.officeBranch,
        phone: user.phone,
        linkedin: user.linkedin,
        location: user.location,
        badge: user.badge,
        teamAssigned: user.teamAssigned,
        joinedFirm: user.joinedFirm,
        created_at: user.createdAt,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect current password' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllowedEmails = async (req, res) => {
  try {
    const list = await AllowedEmail.find({}).sort({ createdAt: -1 });
    res.json(list);
  } catch (error) {
    console.error('Get allowed emails error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addAllowedEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const emailLower = email.toLowerCase().trim();
    
    // Check if already exists
    const existing = await AllowedEmail.findOne({ email: emailLower });
    if (existing) {
      return res.status(400).json({ error: 'Email is already authorized' });
    }

    const newAllowed = await AllowedEmail.create({
      email: emailLower,
      addedBy: req.user.id
    });

    res.status(201).json({
      message: 'Email authorized successfully',
      allowedEmail: newAllowed
    });
  } catch (error) {
    console.error('Add allowed email error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteAllowedEmail = async (req, res) => {
  try {
    const { id } = req.params;
    
    const allowedRecord = await AllowedEmail.findById(id);
    if (!allowedRecord) {
      return res.status(404).json({ error: 'Authorized email record not found' });
    }

    const loggedInUser = await User.findById(req.user.id);
    if (loggedInUser && allowedRecord.email === loggedInUser.email) {
      return res.status(400).json({ error: 'You cannot delete your own email address from the authorized list' });
    }

    await AllowedEmail.findByIdAndDelete(id);
    res.json({ message: 'Email authorization revoked successfully' });
  } catch (error) {
    console.error('Delete allowed email error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { 
  getProfile, 
  updateProfile, 
  changePassword,
  getAllowedEmails,
  addAllowedEmail,
  deleteAllowedEmail
};


