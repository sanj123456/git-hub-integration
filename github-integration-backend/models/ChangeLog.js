const mongoose = require('mongoose');

const ChangeLogSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  issue_id: { type: Number },
  event: { type: String, required: true },
  commit_id: { type: String },
  actor: {
    id: { type: Number },
    login: { type: String },
    avatar_url: { type: String },
    url: { type: String },
  },
  created_at: { type: Date, required: true },
});

module.exports = mongoose.model('ChangeLog', ChangeLogSchema);
