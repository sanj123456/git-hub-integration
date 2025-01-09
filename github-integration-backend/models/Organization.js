const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    login: { type: String, required: true },
    description: { type: String },
    url: { type: String },
    // Add additional fields as needed
});

module.exports = mongoose.model('Organization', OrganizationSchema);
