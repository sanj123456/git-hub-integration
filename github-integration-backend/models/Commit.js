const mongoose = require('mongoose');

const CommitSchema = new mongoose.Schema({
    sha: { type: String, required: true, unique: true },
    message: { type: String },
    author: {
        name: String,
        email: String,
        date: Date,
    },
    committer: {
        name: String,
        email: String,
        date: Date,
    },
    url: { type: String },
    // Add additional fields if needed
});

module.exports = mongoose.model('Commit', CommitSchema);
