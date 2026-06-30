const mongoose = require('mongoose');

const careersPageSchema = new mongoose.Schema(
  {
    heroTitle: { type: String, default: 'Join Our Team' },
    heroDescription: {
      type: String,
      default: 'Students, recent graduates, seasoned professionals, and senior leaders constitute integral pillars of our success.'
    },
    heroImage: { type: String, default: '/careers-hero.jpg' },
    cultureSec1Title: { type: String, default: 'Innovative Collaboration & Dynamic Team Culture' },
    cultureSec1Paragraph1: {
      type: String,
      default: 'At MRNP, our environment fosters collaboration with top-tier talent, visionary thinkers, and industry trailblazers who are at the forefront of forging and sustaining innovative and impactful partnerships.'
    },
    cultureSec1Paragraph2: {
      type: String,
      default: 'Our organization values a dynamic and resourceful team, characterized by youthfulness and energy, present across all our locations. We firmly uphold the belief that our people define our culture and organization, guiding every decision we make.'
    },
    cultureSec2Title: { type: String, default: 'Culture of Excellence' },
    cultureSec2Paragraph1: {
      type: String,
      default: 'At MRNP, our culture is defined by a passionate drive to contribute to global transformation initiatives. We are committed to fostering an environment where creativity flourishes and diverse perspectives thrive. We encourage open expression of ideas and embrace challenges as opportunities for growth and innovation.'
    },
    cultureSec2Paragraph2: {
      type: String,
      default: 'We value individuals who challenge conventional norms and strive for excellence, as this mindset not only enhances personal satisfaction but also drives collective success. Despite our dynamic and forward-thinking approach, MRNP remains steadfast in upholding core values established over decades: integrity and honesty are paramount in every decision and interaction, regardless of seniority or role within the firm.'
    },
    marqueeImages: {
      type: [String],
      default: [
        "https://res.cloudinary.com/dkhsnhjrh/image/upload/v1773911585/20250302_093152_zvu3n8.png",
        "https://res.cloudinary.com/dkhsnhjrh/image/upload/v1773911571/WA_1773389374744_1_ttzjo1.jpg",
        "https://res.cloudinary.com/dkhsnhjrh/image/upload/v1773911566/IMG-20250228-WA0005_mmmaos.jpg",
        "https://res.cloudinary.com/dkhsnhjrh/image/upload/v1773911564/20231124_170013_gztcnk.jpg",
        "https://res.cloudinary.com/dkhsnhjrh/image/upload/v1773911563/20231128_155207_uwyxpo.jpg",
        "https://res.cloudinary.com/dkhsnhjrh/image/upload/v1773911562/20231125_101130_inczac.jpg",
        "https://res.cloudinary.com/dkhsnhjrh/image/upload/v1773911562/20231127_151533_ctfzar.jpg"
      ]
    },
    status: { type: String, enum: ['published', 'draft'], default: 'published' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('CareersPage', careersPageSchema);
