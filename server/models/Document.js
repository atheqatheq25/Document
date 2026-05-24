const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  filename: String,
  path: String,
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Document', documentSchema);