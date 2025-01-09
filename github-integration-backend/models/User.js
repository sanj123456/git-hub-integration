const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    login: { type: String },
    name: { type: String },
    avatar_url: { type: String },
    html_url: { type: String },
    email: { type: String },
    created_at: { type: Date },
    updated_at: { type: Date },
    // Add additional fields if needed
});

module.exports = mongoose.model('User', UserSchema);
