const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
  getAllServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
  uploadServiceImageOnly
} = require('../controllers/serviceController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Ensure upload directory exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage configuration for Service Images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const rawExt = path.extname(file.originalname);
    // Sanitize extension to lowercase
    const ext = rawExt.toLowerCase().replace(/[^.a-z0-9]/g, '');
    cb(null, 'service-' + uniqueSuffix + ext);
  }
});

// File filter to allow only common image formats
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only .png, .jpg, .jpeg, .webp and .svg image files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Wrapper middleware to handle multer errors gracefully
const handleImageUpload = (req, res, next) => {
  const uploadSingle = upload.single('image');
  
  uploadSingle(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

// Endpoints
router.get('/', getAllServices);
router.get('/slug/:slug', getServiceBySlug);

router.post('/', authenticateToken, handleImageUpload, createService);
router.put('/:id', authenticateToken, handleImageUpload, updateService);
router.delete('/:id', authenticateToken, deleteService);
router.post('/upload', authenticateToken, handleImageUpload, uploadServiceImageOnly);

module.exports = router;
