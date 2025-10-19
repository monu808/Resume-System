const mongoose = require('mongoose');

/**
 * IntegrationData Schema
 * Stores data fetched from external platforms (Coursera, GitHub, Devfolio, etc.)
 * This enables automatic resume updates from multiple sources
 */
const integrationDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true, // Index for faster queries
  },
  platform: {
    type: String,
    required: true,
    enum: ['Coursera', 'GitHub', 'Devfolio', 'Udemy', 'LinkedIn'], // Supported platforms
    index: true,
  },
  dataType: {
    type: String,
    required: true,
    enum: ['course', 'project', 'hackathon', 'certification', 'achievement'], // Types of data
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  date: {
    type: String, // Store as string for flexibility (e.g., "2024-12-15" or "Dec 2024")
  },
  certificateUrl: {
    type: String,
    trim: true,
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed, // Flexible field for platform-specific data
    default: {},
  },
  syncedAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true, // Can be disabled without deletion
  },
});

// Compound index to prevent duplicate entries
integrationDataSchema.index({ userId: 1, platform: 1, title: 1 }, { unique: true });

// Instance method to format data for resume
integrationDataSchema.methods.toResumeFormat = function() {
  return {
    title: this.title,
    description: this.description,
    date: this.date,
    certificate: this.certificateUrl,
    platform: this.platform,
  };
};

// Static method to get all data for a user grouped by type
integrationDataSchema.statics.getGroupedByUser = async function(userId) {
  const data = await this.find({ userId, isActive: true }).sort({ date: -1 });
  
  const grouped = {
    courses: [],
    projects: [],
    hackathons: [],
    certifications: [],
    achievements: [],
  };

  data.forEach(item => {
    const formatted = item.toResumeFormat();
    
    switch(item.dataType) {
      case 'course':
        grouped.courses.push(formatted);
        break;
      case 'project':
        grouped.projects.push(formatted);
        break;
      case 'hackathon':
        grouped.hackathons.push(formatted);
        break;
      case 'certification':
        grouped.certifications.push(formatted);
        break;
      case 'achievement':
        grouped.achievements.push(formatted);
        break;
    }
  });

  return grouped;
};

// Static method to get sync statistics
integrationDataSchema.statics.getSyncStats = async function(userId) {
  const stats = await this.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId), isActive: true } },
    { 
      $group: { 
        _id: '$platform', 
        count: { $sum: 1 },
        lastSync: { $max: '$syncedAt' }
      } 
    },
  ]);

  return stats;
};

module.exports = mongoose.model('IntegrationData', integrationDataSchema);
