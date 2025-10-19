const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const IntegrationData = require('../models/IntegrationData');
const Resume = require('../models/Resume');

/**
 * Clear all integration data and resumes for current user
 * DELETE /api/admin/clear-my-data
 */
router.delete('/clear-my-data', authenticate, async (req, res) => {
  try {
    const userId = req.userId;
    
    // Delete user's integration data
    const integrationResult = await IntegrationData.deleteMany({ userId });
    
    // Delete user's resume
    const resumeResult = await Resume.deleteMany({ userId });
    
    res.json({
      success: true,
      message: 'All your data has been cleared successfully',
      deleted: {
        integrations: integrationResult.deletedCount,
        resumes: resumeResult.deletedCount,
      },
    });
  } catch (error) {
    console.error('Clear data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear data',
      error: error.message,
    });
  }
});

/**
 * DANGER: Clear ALL data in database (all users)
 * Only use in development!
 * DELETE /api/admin/clear-all-data
 */
router.delete('/clear-all-data', authenticate, async (req, res) => {
  try {
    // Only allow in development
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({
        success: false,
        message: 'This endpoint is only available in development',
      });
    }
    
    // Delete ALL integration data
    const integrationResult = await IntegrationData.deleteMany({});
    
    // Delete ALL resumes
    const resumeResult = await Resume.deleteMany({});
    
    res.json({
      success: true,
      message: '⚠️ ALL data has been cleared from database',
      deleted: {
        integrations: integrationResult.deletedCount,
        resumes: resumeResult.deletedCount,
      },
    });
  } catch (error) {
    console.error('Clear all data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear data',
      error: error.message,
    });
  }
});

module.exports = router;
