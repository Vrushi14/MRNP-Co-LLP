const Service = require('../models/Service');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

// Helper function to safely delete files
const deleteImageFile = (imagePath) => {
  if (!imagePath) return;
  // Only delete files in our uploads directory
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

const getAllServices = async (req, res) => {
  try {
    let query = { status: { $ne: 'draft' } };
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        if (decoded) {
          query = {}; // Admin can see all (both draft and published)
        }
      } catch (err) {
        // Invalid or expired token, treat as guest
      }
    }
    const services = await Service.find(query).sort({ createdAt: -1 });
    res.json({ services });
  } catch (error) {
    console.error('Get all services error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const service = await Service.findOne({ slug });
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    if (service.status === 'draft') {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      let isAdmin = false;
      if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
          if (decoded) {
            isAdmin = true;
          }
        } catch (err) {
          // Token verification failed
        }
      }
      if (!isAdmin) {
        return res.status(404).json({ error: 'Service not found' });
      }
    }

    res.json(service);
  } catch (error) {
    console.error('Get service by slug error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createService = async (req, res) => {
  try {
    const {
      title,
      slug,
      description,
      pageTitle,
      intro,
      sections,
      whyTitle,
      whySubtitle,
      whyCards,
      status
    } = req.body;

    if (!title || !slug) {
      return res.status(400).json({ error: 'Title and Slug are required' });
    }

    // Check slug uniqueness
    const normalizedSlug = slug.toLowerCase().trim().replace(/[^a-z0-9-_]/g, '-');
    const existingService = await Service.findOne({ slug: normalizedSlug });
    if (existingService) {
      return res.status(400).json({ error: 'A service with this slug already exists' });
    }

    // Process uploaded file
    let imageUrl = '';
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      imageUrl = req.body.image;
    }

    const service = await Service.create({
      title: title.trim(),
      slug: normalizedSlug,
      description: description || '',
      image: imageUrl,
      pageTitle: pageTitle || '',
      intro: intro || '',
      sections: parseJsonField(sections),
      whyTitle: whyTitle || '',
      whySubtitle: whySubtitle || '',
      whyCards: parseJsonField(whyCards).filter(card => card.title?.trim() || card.body?.trim()),
      status: status || 'published'
    });

    res.status(201).json({
      message: 'Service created successfully',
      service
    });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      description,
      pageTitle,
      intro,
      sections,
      whyTitle,
      whySubtitle,
      whyCards,
      status
    } = req.body;

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Handle slug change uniqueness checks
    if (slug) {
      const normalizedSlug = slug.toLowerCase().trim().replace(/[^a-z0-9-_]/g, '-');
      if (normalizedSlug !== service.slug) {
        const existingService = await Service.findOne({ slug: normalizedSlug });
        if (existingService) {
          return res.status(400).json({ error: 'A service with this slug already exists' });
        }
        service.slug = normalizedSlug;
      }
    }

    if (title) service.title = title.trim();
    if (description !== undefined) service.description = description;
    if (pageTitle !== undefined) service.pageTitle = pageTitle;
    if (intro !== undefined) service.intro = intro;
    if (sections !== undefined) service.sections = parseJsonField(sections);
    if (whyTitle !== undefined) service.whyTitle = whyTitle;
    if (whySubtitle !== undefined) service.whySubtitle = whySubtitle;
    if (whyCards !== undefined) service.whyCards = parseJsonField(whyCards).filter(card => card.title?.trim() || card.body?.trim());
    if (status !== undefined) service.status = status;

    // If new image uploaded
    if (req.file) {
      // Delete old image file
      deleteImageFile(service.image);
      service.image = `/uploads/${req.file.filename}`;
    } else if (req.body.image !== undefined) {
      service.image = req.body.image;
    }

    await service.save();

    res.json({
      message: 'Service updated successfully',
      service
    });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Delete image file associated
    deleteImageFile(service.image);

    await Service.findByIdAndDelete(id);

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const uploadServiceImageOnly = async (req, res) => {
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
    console.error('Upload service image error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
  uploadServiceImageOnly
};
