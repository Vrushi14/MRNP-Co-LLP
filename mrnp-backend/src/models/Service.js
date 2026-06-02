const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  heading: { type: String, default: '' },
  description: { type: String, default: '' },
  body: { type: mongoose.Schema.Types.Mixed, default: [] } // Can be a string or array of strings
});

const whyCardSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  body: { type: String, default: '' }
});

const serviceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    
    // Rich Page Content
    pageTitle: { type: String, default: '' },
    intro: { type: String, default: '' },
    sections: { type: [sectionSchema], default: [] },
    whyTitle: { type: String, default: '' },
    whySubtitle: { type: String, default: '' },
    whyCards: { type: [whyCardSchema], default: [] },
    status: { type: String, enum: ['draft', 'published'], default: 'published' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
