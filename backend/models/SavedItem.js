const mongoose = require('mongoose');

const savedItemSchema = new mongoose.Schema({
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
    required: true
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

module.exports = mongoose.model('SavedItem', savedItemSchema);
