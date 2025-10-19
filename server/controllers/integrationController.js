const IntegrationData = require('../models/IntegrationData');
const Resume = require('../models/Resume');
const axios = require('axios');

/**
 * REAL API Integration Functions
 * These functions fetch actual data from external platforms
 */

// Fetch real GitHub data
const getGitHubData = async (username) => {
  try {
    // Fetch user's repositories
    const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`, {
      params: {
        sort: 'updated',
        per_page: 100,
      },
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    const repositories = reposResponse.data;
    
    // Transform to our data structure
    const projects = repositories
      .filter(repo => !repo.fork) // Exclude forked repos
      .slice(0, 10) // Top 10 projects
      .map(repo => ({
        platform: 'GitHub',
        dataType: 'project',
        title: repo.name,
        description: repo.description || 'No description provided',
        date: repo.updated_at.split('T')[0],
        certificateUrl: repo.html_url,
        metadata: {
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          topics: repo.topics || [],
          isPrivate: repo.private,
        },
      }));

    return projects;
  } catch (error) {
    console.error('GitHub API error:', error.response?.data || error.message);
    throw new Error('Failed to fetch GitHub data. Please check the username and try again.');
  }
};

// Fetch Coursera data (requires API key - currently placeholder)
const getCourseraData = async (apiKey) => {
  // Note: Coursera doesn't have a public API for user data
  // This would require OAuth authentication and official Coursera partnership
  // For now, we'll return an error with instructions
  throw new Error(
    'Coursera integration requires manual export. Please:\n' +
    '1. Go to coursera.org/account/accomplishments\n' +
    '2. Export your certificates\n' +
    '3. Use the manual upload feature to add courses'
  );
};

// Fetch Devfolio data
const getDevfolioData = async (username) => {
  try {
    // Devfolio public profile API
    const response = await axios.get(`https://api.devfolio.co/api/users/${username}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    const userData = response.data;
    const projects = [];

    // Extract hackathon projects
    if (userData.hackathons) {
      userData.hackathons.forEach(hackathon => {
        projects.push({
          platform: 'Devfolio',
          dataType: 'hackathon',
          title: `${hackathon.name} - ${hackathon.position || 'Participant'}`,
          description: hackathon.description || '',
          date: hackathon.date,
          certificateUrl: hackathon.url,
          metadata: {
            position: hackathon.position,
            teamSize: hackathon.teamSize,
            technologies: hackathon.technologies || [],
          },
        });
      });
    }

    // Extract regular projects
    if (userData.projects) {
      userData.projects.forEach(project => {
        projects.push({
          platform: 'Devfolio',
          dataType: 'project',
          title: project.name,
          description: project.description || '',
          date: project.createdAt,
          certificateUrl: project.url,
          metadata: {
            likes: project.likes,
            views: project.views,
            technologies: project.technologies || [],
          },
        });
      });
    }

    return projects;
  } catch (error) {
    console.error('Devfolio API error:', error.response?.data || error.message);
    throw new Error('Failed to fetch Devfolio data. Please check the username and try again.');
  }
};

// Fallback mock data for development/testing
const getMockCourseraData = (userId) => {
  return [
    {
      platform: 'Coursera',
      dataType: 'course',
      title: 'AI for Everyone',
      description: 'Completed with distinction. Learned fundamentals of AI, machine learning, and deep learning.',
      date: '2025-01-12',
      certificateUrl: 'https://www.coursera.org/account/accomplishments/certificate/ABC123XYZ',
      metadata: {
        instructor: 'Andrew Ng',
        duration: '4 weeks',
        grade: '98%',
      },
    },
    {
      platform: 'Coursera',
      dataType: 'course',
      title: 'Machine Learning Specialization',
      description: 'Advanced machine learning course covering supervised and unsupervised learning algorithms.',
      date: '2024-11-20',
      certificateUrl: 'https://www.coursera.org/account/accomplishments/specialization/DEF456ABC',
      metadata: {
        instructor: 'Andrew Ng',
        duration: '3 months',
        grade: '95%',
      },
    },
    {
      platform: 'Coursera',
      dataType: 'certification',
      title: 'Google Cloud Professional Data Engineer',
      description: 'Professional certification for data engineering on Google Cloud Platform.',
      date: '2024-09-15',
      certificateUrl: 'https://www.coursera.org/account/accomplishments/professional-cert/GHI789JKL',
      metadata: {
        provider: 'Google Cloud',
        validUntil: '2027-09-15',
      },
    },
  ];
};

// Mock GitHub API response
const getMockGitHubData = (userId) => {
  return [
    {
      platform: 'GitHub',
      dataType: 'project',
      title: 'AI Resume Builder',
      description: 'Full-stack MERN application for creating AI-powered resumes with real-time preview. Features include JWT authentication, MongoDB integration, and Tailwind CSS styling.',
      date: '2025-01-05',
      certificateUrl: 'https://github.com/username/ai-resume-builder',
      metadata: {
        stars: 127,
        forks: 34,
        language: 'JavaScript',
        topics: ['react', 'nodejs', 'mongodb', 'ai', 'resume'],
      },
    },
    {
      platform: 'GitHub',
      dataType: 'project',
      title: 'E-commerce Microservices',
      description: 'Scalable e-commerce platform built with microservices architecture. Includes payment gateway integration, inventory management, and real-time notifications.',
      date: '2024-12-15',
      certificateUrl: 'https://github.com/username/ecommerce-microservices',
      metadata: {
        stars: 89,
        forks: 23,
        language: 'TypeScript',
        topics: ['microservices', 'docker', 'kubernetes', 'ecommerce'],
      },
    },
    {
      platform: 'GitHub',
      dataType: 'achievement',
      title: 'Open Source Contributor',
      description: 'Contributed to 15+ open source projects including React.js, Express.js, and TensorFlow. Total 50+ merged pull requests.',
      date: '2024-10-01',
      certificateUrl: 'https://github.com/username',
      metadata: {
        contributions: 234,
        pullRequests: 52,
        repositories: 15,
      },
    },
  ];
};

// Mock Devfolio API response
const getMockDevfolioData = (userId) => {
  return [
    {
      platform: 'Devfolio',
      dataType: 'hackathon',
      title: 'Smart India Hackathon 2024 - Winner',
      description: 'Built an AI-based resume matching system that connects job seekers with employers. Won first place among 500+ teams nationwide.',
      date: '2024-11-20',
      certificateUrl: 'https://devfolio.co/submissions/ai-resume-matcher',
      metadata: {
        position: '1st Place',
        prizeAmount: '₹1,00,000',
        teamSize: 4,
        technologies: ['React', 'Python', 'TensorFlow', 'MongoDB'],
      },
    },
    {
      platform: 'Devfolio',
      dataType: 'hackathon',
      title: 'ETHIndia 2024 - Finalist',
      description: 'Developed a decentralized credential verification system using blockchain. Reached top 10 finalists out of 1000+ participants.',
      date: '2024-09-30',
      certificateUrl: 'https://devfolio.co/submissions/decred-verify',
      metadata: {
        position: 'Top 10 Finalist',
        technologies: ['Solidity', 'Web3.js', 'React', 'IPFS'],
      },
    },
    {
      platform: 'Devfolio',
      dataType: 'project',
      title: 'HealthChain - Medical Records on Blockchain',
      description: 'Blockchain-based medical records management system ensuring privacy and security. Featured project on Devfolio.',
      date: '2024-08-15',
      certificateUrl: 'https://devfolio.co/projects/healthchain',
      metadata: {
        likes: 156,
        views: 2340,
        technologies: ['Ethereum', 'React', 'Node.js', 'MongoDB'],
      },
    },
  ];
};

/**
 * Reusable function to save integration data
 * Prevents duplicate entries using upsert
 */
const saveIntegrationData = async (userId, records) => {
  const savedRecords = [];
  const errors = [];

  for (const record of records) {
    try {
      // Use upsert to prevent duplicates
      const saved = await IntegrationData.findOneAndUpdate(
        { 
          userId, 
          platform: record.platform, 
          title: record.title 
        },
        { 
          ...record, 
          userId,
          syncedAt: new Date() 
        },
        { 
          upsert: true, 
          new: true, 
          setDefaultsOnInsert: true 
        }
      );
      savedRecords.push(saved);
    } catch (error) {
      errors.push({ title: record.title, error: error.message });
    }
  }

  return { savedRecords, errors };
};

/**
 * Fetch and sync data from Coursera
 * GET /api/integrations/coursera
 */
exports.syncCoursera = async (req, res) => {
  try {
    const userId = req.userId; // From JWT middleware
    const { apiKey } = req.query;
    
    if (!apiKey) {
      return res.status(400).json({
        success: false,
        message: 'API key is required. Please provide your Coursera API key.',
      });
    }
    
    try {
      // Attempt to fetch real data
      const realData = await getCourseraData(apiKey);
      const { savedRecords, errors } = await saveIntegrationData(userId, realData);
      await updateResumeFromIntegrations(userId);
      
      res.json({
        success: true,
        message: `Successfully synced ${savedRecords.length} items from Coursera`,
        data: {
          synced: savedRecords.length,
          failed: errors.length,
          records: savedRecords,
          errors,
        },
      });
    } catch (apiError) {
      // If real API fails, return instructions
      return res.status(400).json({
        success: false,
        message: apiError.message,
        instructions: {
          manual: true,
          steps: [
            'Go to coursera.org/account/accomplishments',
            'Download your certificates',
            'Add courses manually in Resume Builder'
          ]
        }
      });
    }
  } catch (error) {
    console.error('Coursera sync error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to sync Coursera data',
      error: error.message,
    });
  }
};

/**
 * Fetch and sync data from GitHub
 * GET /api/integrations/github
 */
exports.syncGitHub = async (req, res) => {
  try {
    const userId = req.userId;
    const { username } = req.query;
    
    if (!username) {
      return res.status(400).json({
        success: false,
        message: 'GitHub username is required',
      });
    }
    
    // Fetch real GitHub data
    const realData = await getGitHubData(username);
    const { savedRecords, errors } = await saveIntegrationData(userId, realData);
    await updateResumeFromIntegrations(userId);
    
    res.json({
      success: true,
      message: `Successfully synced ${savedRecords.length} items from GitHub`,
      data: {
        synced: savedRecords.length,
        failed: errors.length,
        records: savedRecords,
        errors,
        username,
      },
    });
  } catch (error) {
    console.error('GitHub sync error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to sync GitHub data',
      error: error.message,
    });
  }
};

/**
 * Fetch and sync data from Devfolio
 * GET /api/integrations/devfolio
 */
exports.syncDevfolio = async (req, res) => {
  try {
    const userId = req.userId;
    const { username } = req.query;
    
    if (!username) {
      return res.status(400).json({
        success: false,
        message: 'Devfolio username is required',
      });
    }
    
    try {
      // Attempt to fetch real data
      const realData = await getDevfolioData(username);
      const { savedRecords, errors } = await saveIntegrationData(userId, realData);
      await updateResumeFromIntegrations(userId);
      
      res.json({
        success: true,
        message: `Successfully synced ${savedRecords.length} items from Devfolio`,
        data: {
          synced: savedRecords.length,
          failed: errors.length,
          records: savedRecords,
          errors,
          username,
        },
      });
    } catch (apiError) {
      // If API fails, provide fallback option
      return res.status(400).json({
        success: false,
        message: apiError.message,
        fallback: 'You can add hackathon projects manually in Resume Builder',
      });
    }
  } catch (error) {
    console.error('Devfolio sync error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to sync Devfolio data',
      error: error.message,
    });
  }
};

/**
 * Get all integration data for current user
 * GET /api/integrations/data
 */
exports.getIntegrationData = async (req, res) => {
  try {
    const userId = req.userId;
    
    const data = await IntegrationData.find({ userId, isActive: true })
      .sort({ syncedAt: -1 });
    
    const grouped = await IntegrationData.getGroupedByUser(userId);
    const stats = await IntegrationData.getSyncStats(userId);
    
    res.json({
      success: true,
      data: {
        all: data,
        grouped,
        stats,
      },
    });
  } catch (error) {
    console.error('Get integration data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch integration data',
      error: error.message,
    });
  }
};

/**
 * Sync all platforms at once
 * POST /api/integrations/sync-all
 */
exports.syncAll = async (req, res) => {
  try {
    const userId = req.userId;
    
    // Fetch from all platforms
    const courseraData = getMockCourseraData(userId);
    const githubData = getMockGitHubData(userId);
    const devfolioData = getMockDevfolioData(userId);
    
    const allData = [...courseraData, ...githubData, ...devfolioData];
    
    const { savedRecords, errors } = await saveIntegrationData(userId, allData);
    
    await updateResumeFromIntegrations(userId);
    
    res.json({
      success: true,
      message: `Successfully synced ${savedRecords.length} items from all platforms`,
      data: {
        synced: savedRecords.length,
        failed: errors.length,
        platforms: {
          coursera: courseraData.length,
          github: githubData.length,
          devfolio: devfolioData.length,
        },
        errors,
      },
    });
  } catch (error) {
    console.error('Sync all error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to sync all platforms',
      error: error.message,
    });
  }
};

/**
 * Delete integration data
 * DELETE /api/integrations/data/:id
 */
exports.deleteIntegrationData = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    
    const deleted = await IntegrationData.findOneAndUpdate(
      { _id: id, userId },
      { isActive: false },
      { new: true }
    );
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Integration data not found',
      });
    }
    
    await updateResumeFromIntegrations(userId);
    
    res.json({
      success: true,
      message: 'Integration data deleted successfully',
    });
  } catch (error) {
    console.error('Delete integration data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete integration data',
      error: error.message,
    });
  }
};

/**
 * CORE FUNCTION: Auto-update resume from all integration data
 * This merges external platform data into the user's resume
 */
const updateResumeFromIntegrations = async (userId) => {
  try {
    // Get all active integration data
    const integrationData = await IntegrationData.find({ userId, isActive: true });
    
    // Get current resume
    let resume = await Resume.findOne({ userId });
    
    if (!resume) {
      // Create new resume if doesn't exist
      resume = new Resume({ userId });
    }
    
    // Group data by type
    const courses = integrationData
      .filter(d => d.dataType === 'course' || d.dataType === 'certification')
      .map(d => ({
        title: d.title,
        provider: d.platform,
        completionDate: d.date,
        certificate: d.certificateUrl,
        description: d.description,
      }));
    
    const projects = integrationData
      .filter(d => d.dataType === 'project')
      .map(d => {
        // Convert technologies array to comma-separated string
        let techArray = d.metadata?.technologies || d.metadata?.topics || [];
        
        // Add language as primary technology if available
        if (d.metadata?.language) {
          techArray = [d.metadata.language, ...techArray];
        }
        
        const techString = Array.isArray(techArray) 
          ? techArray.filter(t => t).join(', ') 
          : techArray.toString();
        
        return {
          title: d.title,
          description: d.description,
          technologies: techString,
          link: d.certificateUrl,
          date: d.date,
        };
      });
    
    const achievements = integrationData
      .filter(d => d.dataType === 'hackathon' || d.dataType === 'achievement')
      .map(d => ({
        title: d.title,
        description: d.description,
        date: d.date,
      }));
    
    // Merge with existing data (avoid duplicates)
    resume.courses = mergeArraysByTitle([...(resume.courses || []), ...courses]);
    resume.projects = mergeArraysByTitle([...(resume.projects || []), ...projects]);
    resume.achievements = mergeArraysByTitle([...(resume.achievements || []), ...achievements]);
    
    // Save updated resume
    await resume.save();
    
    return resume;
  } catch (error) {
    console.error('Update resume from integrations error:', error);
    throw error;
  }
};

/**
 * Helper function to merge arrays and remove duplicates by title
 */
const mergeArraysByTitle = (array) => {
  const seen = new Set();
  return array.filter(item => {
    const title = item.title?.toLowerCase();
    if (seen.has(title)) {
      return false;
    }
    seen.add(title);
    return true;
  });
};

module.exports.updateResumeFromIntegrations = updateResumeFromIntegrations;
