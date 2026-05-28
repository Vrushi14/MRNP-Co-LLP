const CareerApplication = require('../models/CareerApplication');
const Notification = require('../models/Notification');
const fs = require('fs');
const path = require('path');

const escapeCSV = (val) => {
  if (val === null || val === undefined) return '';
  const stringVal = String(val);
  if (stringVal.includes(',') || stringVal.includes('"') || stringVal.includes('\n') || stringVal.includes('\r')) {
    return `"${stringVal.replace(/"/g, '""')}"`;
  }
  return stringVal;
};

const baseDir = path.normalize(path.resolve(__dirname, '../../'));
const csvFilePath = path.normalize(path.resolve(baseDir, 'applications.csv'));

if (!csvFilePath.startsWith(baseDir)) {
  throw new Error('Access denied: path traversal attempt detected.');
}

const submitApplication = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      education,
      currentCompany,
      experience,
      jobDepartment,
      jobPosition,
      jobCity
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !education || !experience || !jobDepartment || !jobPosition || !jobCity) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Resume file is required' });
    }

    // Save resume path (multer stores the uploaded file info in req.file)
    const resumePath = `/uploads/${req.file.filename}`;

    const application = await CareerApplication.create({
      name,
      email,
      phone,
      education,
      currentCompany: currentCompany || null,
      experience,
      resumePath,
      jobDepartment,
      jobPosition,
      jobCity
    });

    // Create Notification alert
    await Notification.create({
      type: 'new_application',
      title: 'New Candidate Application',
      message: `${name} has applied for the ${jobPosition} role in ${jobCity}.`,
      link: '/dashboard?tab=applications'
    });


    // Append application data to CSV file in tabular format
    try {
      const headers = [
        'Name',
        'Email',
        'Phone',
        'Education',
        'Current Company',
        'Experience',
        'Resume Path',
        'Job Department',
        'Job Position',
        'Job City',
        'Submitted At'
      ];

      const rowData = [
        name,
        email,
        phone,
        education,
        currentCompany || '',
        experience,
        resumePath,
        jobDepartment,
        jobPosition,
        jobCity,
        application.createdAt ? application.createdAt.toISOString() : new Date().toISOString()
      ];

      const csvRow = rowData.map(escapeCSV).join(',') + '\n';

      const fileExists = fs.existsSync(csvFilePath);
      const isFileEmpty = fileExists ? fs.statSync(csvFilePath).size === 0 : true;

      if (!fileExists || isFileEmpty) {
        const csvHeader = headers.join(',') + '\n';
        fs.writeFileSync(csvFilePath, csvHeader + csvRow, 'utf8');
      } else {
        fs.appendFileSync(csvFilePath, csvRow, 'utf8');
      }
    } catch (csvErr) {
      console.error('Error writing to applications.csv:', csvErr);
    }

    res.status(201).json({
      message: 'Application submitted successfully',
      application: {
        id: application._id,
        name: application.name,
        email: application.email,
        created_at: application.createdAt,
        createdAt: application.createdAt
      }
    });
  } catch (error) {
    console.error('Submit application error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getApplications = async (req, res) => {
  try {
    const applications = await CareerApplication.find().sort({ createdAt: -1 });
    
    const mappedApplications = applications.map(app => ({
      id: app._id,
      _id: app._id,
      name: app.name,
      email: app.email,
      phone: app.phone,
      education: app.education,
      currentCompany: app.currentCompany,
      current_company: app.currentCompany,
      experience: app.experience,
      resumePath: app.resumePath,
      resume_path: app.resumePath,
      jobDepartment: app.jobDepartment,
      job_department: app.jobDepartment,
      jobPosition: app.jobPosition,
      job_position: app.jobPosition,
      jobCity: app.jobCity,
      job_city: app.jobCity,
      createdAt: app.createdAt,
      created_at: app.createdAt,
      updatedAt: app.updatedAt
    }));

    res.json({ applications: mappedApplications });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  submitApplication,
  getApplications
};

