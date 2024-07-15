const mongoose = require('mongoose');

const WorkspaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  elements: { type: Array, default: [] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  canvasColor: { type: String, default: '#ffffff' }, 
}, { timestamps: true });

module.exports = mongoose.model('Workspace', WorkspaceSchema);