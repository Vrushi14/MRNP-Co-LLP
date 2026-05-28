const EmailLog = require('../models/EmailLog');
const CareerApplication = require('../models/CareerApplication');
const Notification = require('../models/Notification');

const sendEmail = async (req, res) => {
  try {
    const { applicantId, recipientEmail, subject, body, type } = req.body;

    if (!applicantId || !recipientEmail || !subject || !body || !type) {
      return res.status(400).json({ error: 'All fields (applicantId, recipientEmail, subject, body, type) are required' });
    }

    // Verify applicant exists
    const applicant = await CareerApplication.findById(applicantId);
    if (!applicant) {
      return res.status(404).json({ error: 'Applicant not found' });
    }

    // Log the simulated email to the DB
    const emailLog = await EmailLog.create({
      applicantId,
      recipientEmail,
      subject,
      body,
      type,
      status: 'sent'
    });

    // Create Notification for the outreach dispatch
    await Notification.create({
      type: 'email_log',
      title: 'Outreach Email Dispatched',
      message: `Outreach email (${type}) successfully sent to ${recipientEmail} for the ${applicant.jobPosition} role.`,
      link: '/dashboard?tab=notifications'
    });

    // Simulate sending email to console logs
    console.log('==================================================');
    console.log(`[EMAIL AUTOMATION] Simulating delivery to ${recipientEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`Type: ${type.toUpperCase()}`);
    console.log(`Body:\n${body}`);
    console.log('==================================================');

    res.status(201).json({
      message: 'Email dispatched and logged successfully',
      emailLog
    });
  } catch (error) {
    console.error('Send email error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getEmailLogs = async (req, res) => {
  try {
    const { applicantId } = req.params;

    if (!applicantId) {
      return res.status(400).json({ error: 'Applicant ID is required' });
    }

    const emailLogs = await EmailLog.find({ applicantId }).sort({ createdAt: -1 });
    res.json({ emailLogs });
  } catch (error) {
    console.error('Get email logs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllEmailLogs = async (req, res) => {
  try {
    const emailLogs = await EmailLog.find()
      .populate('applicantId', 'name email jobPosition')
      .sort({ createdAt: -1 });
    res.json({ emailLogs });
  } catch (error) {
    console.error('Get all email logs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  sendEmail,
  getEmailLogs,
  getAllEmailLogs
};

