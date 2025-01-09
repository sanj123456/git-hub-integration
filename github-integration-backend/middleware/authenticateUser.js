const Integration = require('../models/Integration');

async function authenticateUser(req, res, next) {
    try {
        // Fetch the user's integration data (access token)
        const integration = await Integration.findOne();
        if (!integration) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        // Attach the access token to the request object
        req.user = { accessToken: integration.accessToken };
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error in authentication middleware:', error.message);
        res.status(500).json({ error: 'Failed to authenticate user', details: error.message });
    }
}

module.exports = authenticateUser;
