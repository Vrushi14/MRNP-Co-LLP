const Interview = require('../models/Interview');
const CareerApplication = require('../models/CareerApplication');
const Notification = require('../models/Notification');

const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find()
      .populate('applicantId', 'name email phone jobPosition jobDepartment jobCity')
      .sort({ date: 1 });
    res.json({ interviews });
  } catch (error) {
    console.error('Get interviews error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const scheduleInterview = async (req, res) => {
  try {
    const { applicantId, interviewer, title, date, duration, meetingLink, notes } = req.body;

    if (!applicantId || !interviewer || !title || !date || !meetingLink) {
      return res.status(400).json({ error: 'All fields (applicantId, interviewer, title, date, meetingLink) are required' });
    }

    const applicant = await CareerApplication.findById(applicantId);
    if (!applicant) {
      return res.status(404).json({ error: 'Applicant not found' });
    }

    const interview = await Interview.create({
      applicantId,
      interviewer,
      title,
      date,
      duration: duration || 45,
      meetingLink,
      notes: notes || '',
      status: 'scheduled'
    });

    // Create Notification
    const formattedDate = new Date(date).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    await Notification.create({
      type: 'interview_reminder',
      title: 'Interview Scheduled',
      message: `Interview "${title}" scheduled for ${applicant.name} with ${interviewer} on ${formattedDate}.`,
      link: '/dashboard?tab=interviews'
    });

    res.status(201).json({
      message: 'Interview scheduled successfully',
      interview
    });
  } catch (error) {
    console.error('Schedule interview error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { interviewer, title, date, duration, meetingLink, notes, status } = req.body;

    const interview = await Interview.findById(id).populate('applicantId', 'name');
    if (!interview) {
      return res.status(404).json({ error: 'Interview not found' });
    }

    if (interviewer) interview.interviewer = interviewer;
    if (title) interview.title = title;
    if (date) interview.date = date;
    if (duration) interview.duration = duration;
    if (meetingLink) interview.meetingLink = meetingLink;
    if (notes !== undefined) interview.notes = notes;
    if (status) interview.status = status;

    await interview.save();

    // Create Notification
    const formattedDate = new Date(interview.date).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    await Notification.create({
      type: 'interview_reminder',
      title: `Interview ${status === 'cancelled' ? 'Cancelled' : status === 'completed' ? 'Completed' : 'Updated'}`,
      message: `Interview with ${interview.applicantId?.name || 'Candidate'} on ${formattedDate} is now ${status || 'updated'}.`,
      link: '/dashboard?tab=interviews'
    });

    res.json({
      message: 'Interview updated successfully',
      interview
    });
  } catch (error) {
    console.error('Update interview error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const cancelInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const interview = await Interview.findById(id).populate('applicantId', 'name');
    if (!interview) {
      return res.status(404).json({ error: 'Interview not found' });
    }

    interview.status = 'cancelled';
    await interview.save();

    await Notification.create({
      type: 'interview_reminder',
      title: 'Interview Cancelled',
      message: `Interview with ${interview.applicantId?.name || 'Candidate'} has been marked as Cancelled.`,
      link: '/dashboard?tab=interviews'
    });

    res.json({ message: 'Interview marked as cancelled successfully', interview });
  } catch (error) {
    console.error('Cancel interview error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getInterviews,
  scheduleInterview,
  updateInterview,
  cancelInterview
};
