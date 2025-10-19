const express = require('express');
const router = express.Router();
const integrationController = require('../controllers/integrationController');
const authenticate = require('../middleware/auth');

// All integration routes require authentication
router.use(authenticate);

/**
 * Platform-specific sync routes
 * These endpoints fetch data from external platforms and save to database
 */

// Sync Coursera data
// GET /api/integrations/coursera
router.get('/coursera', integrationController.syncCoursera);

// Sync GitHub data
// GET /api/integrations/github
router.get('/github', integrationController.syncGitHub);

// Sync Devfolio data
// GET /api/integrations/devfolio
router.get('/devfolio', integrationController.syncDevfolio);

// Sync all platforms at once
// POST /api/integrations/sync-all
router.post('/sync-all', integrationController.syncAll);

/**
 * Data management routes
 */

// Get all integration data for current user
// GET /api/integrations/data
router.get('/data', integrationController.getIntegrationData);

// Delete specific integration data
// DELETE /api/integrations/data/:id
router.delete('/data/:id', integrationController.deleteIntegrationData);

module.exports = router;
