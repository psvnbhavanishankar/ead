const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'client'
  },

  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  },

  content: {
    type: String,
    required: true
  },

  timestamp: {
    type: Date,
    default: Date.now
  },

  upvotes: {
    type: Number
  },

  downvotes: {
    type: Number
  }
});

module.exports = Comment = mongoose.model('comment', CommentSchema);
