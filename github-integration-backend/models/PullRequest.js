const mongoose = require('mongoose');

const PullRequestSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String },
    state: { type: String },
    user: {
        login: String,
        id: Number,
    },
    created_at: { type: Date },
    updated_at: { type: Date },
    url: { type: String },
    // Add additional fields if needed
});

module.exports = mongoose.model('PullRequest', PullRequestSchema);
