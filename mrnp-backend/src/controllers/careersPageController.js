const CareersPage = require('../models/CareersPage');
const fs = require('fs');
const path = require('path');

// Helper function to safely delete files
const deleteImageFile = (imagePath) => {
  if (!imagePath) return;
  if (imagePath.startsWith('/uploads/')) {
    const filename = imagePath.replace('/uploads/', '');
    const fullPath = path.join(__dirname, '../../uploads', filename);
    if (fs.existsSync(fullPath)) {
      fs.unlink(fullPath, (err) => {
        if (err) console.error(`Error deleting file: ${fullPath}`, err);
        else console.log(`Deleted file: ${fullPath}`);
      });
    }
  }
};

// Helper function to parse JSON fields safely
const parseJsonField = (fieldValue) => {
  if (!fieldValue) return [];
  if (typeof fieldValue === 'string') {
    try {
      return JSON.parse(fieldValue);
    } catch (e) {
      console.error('Failed to parse JSON field:', fieldValue, e);
      return [];
    }
  }
  return fieldValue;
};

// GET /api/careers/content
const getCareersPageContent = async (req, res) => {
  try {
    let content = await CareersPage.findOne();
    if (!content) {
      content = await CareersPage.create({});
    }
    res.json(content);
  } catch (error) {
    console.error('Get Careers Page content error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PUT /api/careers/content
const updateCareersPageContent = async (req, res) => {
  try {
    const {
      heroTitle,
      heroDescription,
      heroImage,
      cultureSec1Title,
      cultureSec1Paragraph1,
      cultureSec1Paragraph2,
      cultureSec2Title,
      cultureSec2Paragraph1,
      cultureSec2Paragraph2,
      marqueeImages,
      status
    } = req.body;

    let content = await CareersPage.findOne();
    if (!content) {
      content = new CareersPage();
    }

    if (heroTitle !== undefined) content.heroTitle = heroTitle;
    if (heroDescription !== undefined) content.heroDescription = heroDescription;
    if (heroImage !== undefined) content.heroImage = heroImage;
    if (cultureSec1Title !== undefined) content.cultureSec1Title = cultureSec1Title;
    if (cultureSec1Paragraph1 !== undefined) content.cultureSec1Paragraph1 = cultureSec1Paragraph1;
    if (cultureSec1Paragraph2 !== undefined) content.cultureSec1Paragraph2 = cultureSec1Paragraph2;
    if (cultureSec2Title !== undefined) content.cultureSec2Title = cultureSec2Title;
    if (cultureSec2Paragraph1 !== undefined) content.cultureSec2Paragraph1 = cultureSec2Paragraph1;
    if (cultureSec2Paragraph2 !== undefined) content.cultureSec2Paragraph2 = cultureSec2Paragraph2;
    if (status !== undefined) content.status = status;

    if (marqueeImages !== undefined) {
      content.marqueeImages = parseJsonField(marqueeImages).filter(img => img && img.trim());
    }

    await content.save();

    res.json({
      message: 'Careers page content updated successfully',
      content
    });
  } catch (error) {
    console.error('Update Careers Page content error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /api/careers/upload
const uploadCareersImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an image' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({
      message: 'Image uploaded successfully',
      imageUrl
    });
  } catch (error) {
    console.error('Upload Careers image error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getCareersPageContent,
  updateCareersPageContent,
  uploadCareersImage
};
