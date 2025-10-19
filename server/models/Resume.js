const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  personalInfo: {
    name: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    github: String,
    website: String,
  },
  summary: {
    type: String,
    default: '',
  },
  experience: [{
    company: String,
    position: String,
    startDate: String,
    endDate: String,
    current: Boolean,
    description: String,
  }],
  education: [{
    institution: String,
    degree: String,
    field: String,
    startDate: String,
    endDate: String,
    current: Boolean,
    gpa: String,
  }],
  skills: [{
    type: String,
    trim: true,
  }],
  projects: [{
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    technologies: String,
    link: String,
    date: String,
  }],
  courses: [{
    title: {
      type: String,
      required: true,
      trim: true,
    },
    provider: String,
    completionDate: String,
    certificate: String,
  }],
  achievements: [{
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    date: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
resumeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Resume', resumeSchema);
