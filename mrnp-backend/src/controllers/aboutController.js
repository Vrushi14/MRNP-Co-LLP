const About = require('../models/About');
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

// GET /api/about
const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      // Create defaults if not found (failsafe)
      about = await About.create({});
    }
    res.json(about);
  } catch (error) {
    console.error('Get About error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PUT /api/about
const updateAbout = async (req, res) => {
  try {
    const {
      heroTitle,
      heroDescription,
      commitmentImage,
      commitmentTitle,
      commitmentParagraphs,
      values,
      partners
    } = req.body;

    let about = await About.findOne();
    if (!about) {
      about = new About();
    }

    if (heroTitle !== undefined) about.heroTitle = heroTitle;
    if (heroDescription !== undefined) about.heroDescription = heroDescription;
    if (commitmentImage !== undefined) about.commitmentImage = commitmentImage;
    if (commitmentTitle !== undefined) about.commitmentTitle = commitmentTitle;
    
    if (commitmentParagraphs !== undefined) {
      about.commitmentParagraphs = parseJsonField(commitmentParagraphs);
    }
    if (values !== undefined) {
      about.values = parseJsonField(values).filter(val => val.title?.trim() || val.description?.trim());
    }
    if (partners !== undefined) {
      about.partners = parseJsonField(partners).filter(pt => pt.name?.trim() || pt.role?.trim());
    }

    await about.save();

    res.json({
      message: 'About page content updated successfully',
      about
    });
  } catch (error) {
    console.error('Update About error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /api/about/upload
const uploadAboutImageOnly = async (req, res) => {
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
    console.error('Upload About image error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAbout,
  updateAbout,
  uploadAboutImageOnly
};
