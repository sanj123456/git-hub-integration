const mongoose = require('mongoose');

const IntegrationSchema = new mongoose.Schema({
    userId: String,
    accessToken: String,
    refreshToken: String,
    scope: String,
    tokenType: String,
    connectedAt: Date,
});

module.exports = mongoose.model('Integration', IntegrationSchema);
