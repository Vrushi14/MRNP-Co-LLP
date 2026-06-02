const mongoose = require('mongoose');

const aboutValueSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  icon: { type: String, default: '' }
});

const aboutPartnerSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  role: { type: String, default: '' },
  degree: { type: String, default: '' },
  image: { type: String, default: '' },
  email: { type: String, default: '' },
  bio: { type: String, default: '' }
});

const aboutSchema = new mongoose.Schema(
  {
    heroTitle: { type: String, default: 'Empowering Financial Futures.' },
    heroDescription: {
      type: String,
      default: "We see each client as unique, with their own set of goals and challenges. That's why we don't offer a one-size-fits-all solution. We're dedicated to understanding your specific needs and working tirelessly to deliver the best possible results."
    },
    commitmentImage: { type: String, default: '/images/about-group.png' },
    commitmentTitle: { type: String, default: 'An everlasting commitment to fiduciary values' },
    commitmentParagraphs: {
      type: [String],
      default: [
        "Established in 2011, MRNP & CO LLP is a distinguished Chartered Accountant firm with a robust presence across multiple states including Bengaluru, Ahmedabad, Raipur, Surat, Vadodara, Gandhidham, and Bhuj. Founded by a cadre of young, dynamic professionals with extensive backgrounds in top consulting firms, our firm specializes in delivering customized solutions to meet the diverse needs of our clients.",
        "At MRNP & CO LLP, we are committed to providing high-quality, timely services tailored to industry-specific requirements. Our team comprises talented professionals who leverage their expertise to deliver technology-enabled solutions that ensure client success. We prioritize a collaborative approach, fostering synergy across our service areas to offer comprehensive solutions even in the most complex scenarios."
      ]
    },
    values: { type: [aboutValueSchema], default: [] },
    partners: { type: [aboutPartnerSchema], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('About', aboutSchema);
