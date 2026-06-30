const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { submitApplication, getApplications } = require('../controllers/careerController');
const { getCareersPageContent, updateCareersPageContent, uploadCareersImage } = require('../controllers/careersPageController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Ensure upload directory exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const rawExt = path.extname(file.originalname);
    // Sanitize extension to only allow lowercase letters, numbers, and dot
    const ext = rawExt.toLowerCase().replace(/[^.a-z0-9]/g, '');
    cb(null, 'resume-' + uniqueSuffix + ext);
  }
});

// File filter to allow only PDF, DOC, DOCX
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only .pdf, .doc and .docx files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Handle multer error handling gracefully
const handleUpload = (req, res, next) => {
  const uploadSingle = upload.single('resume');
  
  uploadSingle(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

// Storage configuration for Careers Images
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const rawExt = path.extname(file.originalname);
    const ext = rawExt.toLowerCase().replace(/[^.a-z0-9]/g, '');
    cb(null, 'careers-' + uniqueSuffix + ext);
  }
});

const imageFileFilter = (req, file, cb) => {
  const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only .png, .jpg, .jpeg, .webp and .svg image files are allowed'), false);
  }
};

const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const handleImageUpload = (req, res, next) => {
  const uploadSingle = uploadImage.single('image');
  
  uploadSingle(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

router.post('/apply', handleUpload, submitApplication);
router.get('/applications', authenticateToken, getApplications);

// Content management routes
router.get('/content', getCareersPageContent);
router.put('/content', authenticateToken, updateCareersPageContent);
router.post('/upload', authenticateToken, handleImageUpload, uploadCareersImage);

module.exports = router;
