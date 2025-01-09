const mongoose = require('mongoose');

const RepositorySchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true }, // Unique GitHub repository ID
    name: { type: String, required: true }, // Repository name
    full_name: { type: String }, // Full name (e.g., "org/repo-name")
    private: { type: Boolean, required: true }, // Whether the repo is private
    owner: {
        login: { type: String },
        id: { type: Number },
    }, // Owner details (can be an organization or user)
    html_url: { type: String }, // URL to the repository on GitHub
    description: { type: String }, // Repository description
    fork: { type: Boolean }, // Whether it is a fork
    created_at: { type: Date }, // Creation date
    updated_at: { type: Date }, // Last update date
    pushed_at: { type: Date }, // Last push date
    homepage: { type: String }, // Repository homepage (if available)
    size: { type: Number }, // Size of the repository
    stargazers_count: { type: Number }, // Star count
    watchers_count: { type: Number }, // Watcher count
    language: { type: String }, // Main programming language
    forks_count: { type: Number }, // Fork count
    open_issues_count: { type: Number }, // Open issues count
    license: {
        key: { type: String },
        name: { type: String },
        spdx_id: { type: String },
        url: { type: String },
    }, // License information
    default_branch: { type: String }, // Default branch name (e.g., "main" or "master")
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

module.exports = mongoose.model('Repository', RepositorySchema);
