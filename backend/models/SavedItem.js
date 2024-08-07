const mongoose = require('mongoose');

const SavedItemSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  itemId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    default: 'uncategorized'
  },
  image: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  savedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SavedItem', SavedItemSchema);

