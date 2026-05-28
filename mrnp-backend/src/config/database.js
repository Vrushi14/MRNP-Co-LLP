const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const Job = require('../models/Job');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');

    // Seed default "IT - Software Engineer" job if not present
    try {
      const hasSoftwareEngineer = await Job.findOne({ department: 'IT', position: 'Software Engineer' });
      if (!hasSoftwareEngineer) {
        console.log('Seeding default job: Software Engineer...');
        await Job.create({
          department: 'IT',
          position: 'Software Engineer',
          city: 'Vadodara',
          state: 'Gujarat',
          description: 'We are looking for a skilled Software Engineer to join our team. As an SDE, you will be responsible for designing, developing, and maintaining scalable software solutions. You will work closely with cross-functional teams to deliver high-quality products.',
          requirements: [
            'Design, develop, and deploy scalable applications.',
            'Write clean, maintainable, and efficient code.',
            'Collaborate with product managers and designers to implement new features.',
            'Optimize applications for performance and security.',
            'Debug and resolve software issues.'
          ]
        });
        console.log('Default job seeded successfully!');
      }
    } catch (seedErr) {
      console.error('Error seeding default job:', seedErr);
    }
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
