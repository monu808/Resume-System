const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const authenticate = require('../middleware/auth');

// All routes are protected
router.use(authenticate);

// Resume routes
router.post('/generate-summary', resumeController.generateSummary);
router.post('/save-resume', resumeController.saveResume);
router.get('/resume', resumeController.getMyResume);
router.get('/resume/:userId', resumeController.getResume);
router.delete('/resume', resumeController.deleteResume);

module.exports = router;
