const Resume = require('../models/Resume');

/**
 * AI-powered summary generation (simulated)
 * This function creates a professional summary based on user data
 */
const generateAISummary = (resumeData, userName, userRole) => {
  const { skills, projects, courses, achievements, experience } = resumeData;

  // Count items
  const skillCount = skills?.length || 0;
  const projectCount = projects?.length || 0;
  const courseCount = courses?.length || 0;
  const achievementCount = achievements?.length || 0;
  const experienceYears = experience?.length || 0;

  // Build dynamic summary
  let summary = `${userName} is a passionate ${userRole || 'professional'}`;

  if (skillCount > 0) {
    const topSkills = skills.slice(0, 5).join(', ');
    summary += ` with expertise in ${topSkills}`;
  }

  if (projectCount > 0) {
    summary += `. With hands-on experience in ${projectCount} ${projectCount === 1 ? 'project' : 'projects'}`;
  }

  if (experienceYears > 0) {
    summary += ` and ${experienceYears} ${experienceYears === 1 ? 'position' : 'positions'} of professional experience`;
  }

  if (courseCount > 0) {
    summary += `, ${userName.split(' ')[0]} demonstrates continuous learning through ${courseCount} completed ${courseCount === 1 ? 'course' : 'courses'}`;
  }

  if (achievementCount > 0) {
    summary += ` and has earned ${achievementCount} notable ${achievementCount === 1 ? 'achievement' : 'achievements'}`;
  }

  summary += `. Known for delivering high-quality solutions and staying current with industry trends.`;

  return summary;
};

/**
 * Generate AI resume summary
 * POST /api/generate-summary
 */
exports.generateSummary = async (req, res) => {
  try {
    const { skills, projects, courses, achievements, experience, name, role } = req.body;

    const summary = generateAISummary(
      { skills, projects, courses, achievements, experience },
      name || req.user?.name || 'This professional',
      role || req.user?.role || 'Software Developer'
    );

    res.json({
      success: true,
      message: 'Summary generated successfully',
      data: { summary },
    });
  } catch (error) {
    console.error('Generate summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating summary',
      error: error.message,
    });
  }
};

/**
 * Save or update resume
 * POST /api/save-resume
 */
exports.saveResume = async (req, res) => {
  try {
    const userId = req.userId;
    const resumeData = req.body;

    // Check if resume already exists
    let resume = await Resume.findOne({ userId });

    if (resume) {
      // Update existing resume
      Object.assign(resume, resumeData);
      await resume.save();
    } else {
      // Create new resume
      resume = new Resume({
        userId,
        ...resumeData,
      });
      await resume.save();
    }

    res.json({
      success: true,
      message: 'Resume saved successfully',
      data: resume,
    });
  } catch (error) {
    console.error('Save resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving resume',
      error: error.message,
    });
  }
};

/**
 * Get user's resume
 * GET /api/resume/:userId
 */
exports.getResume = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if user is accessing their own resume or is authorized
    if (userId !== req.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only access your own resume',
      });
    }

    const resume = await Resume.findOne({ userId }).populate('userId', 'name email role');

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    res.json({
      success: true,
      data: resume,
    });
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching resume',
      error: error.message,
    });
  }
};

/**
 * Get current user's resume
 * GET /api/resume
 */
exports.getMyResume = async (req, res) => {
  try {
    const userId = req.userId;

    const resume = await Resume.findOne({ userId }).populate('userId', 'name email role');

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    res.json({
      success: true,
      data: resume,
    });
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching resume',
      error: error.message,
    });
  }
};

/**
 * Delete resume
 * DELETE /api/resume
 */
exports.deleteResume = async (req, res) => {
  try {
    const userId = req.userId;

    const resume = await Resume.findOneAndDelete({ userId });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    res.json({
      success: true,
      message: 'Resume deleted successfully',
    });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting resume',
      error: error.message,
    });
  }
};
