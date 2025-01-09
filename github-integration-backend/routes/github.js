const express = require('express');
const {
    authenticate,
    removeIntegration,
    getStatus,
    fetchOrganizations,
    fetchRepositories,
    fetchCommits,
    fetchPullRequests,
    fetchIssues,
    fetchChangeLogs,
    fetchUsers,
} = require('../controllers/githubController');
const authenticateUser = require('../middleware/authenticateUser'); // Import the middleware
const validatePagination = require('../middleware/validatePagination');
const router = express.Router();

// Public routes (no authentication required)
router.post('/auth', authenticate);
router.get('/status', getStatus);
router.delete('/remove', removeIntegration);

// Protected routes (authentication required)
router.use(authenticateUser); // Apply middleware to all routes below


router.get('/organizations', validatePagination, fetchOrganizations);
router.get('/organizations/repos/:org', validatePagination, fetchRepositories);
router.get('/organizations/repos/commits/:repo/:org', validatePagination, fetchCommits);
router.get('/organizations/repos/pulls/:repo/:org', validatePagination, fetchPullRequests);
router.get('/organizations/repos/issues/:repo/:org', validatePagination, fetchIssues);
router.get('/organizations/repos/issues/changelogs/:repo/:org',validatePagination, fetchChangeLogs);
router.get('/organizations/users', fetchUsers);

module.exports = router;
