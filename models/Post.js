const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'client',
    required: true,
  },

  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },

  tag: {
    type: String,
  },

  upvotes: {
    type: Number,
  },

  downvotes: {
    type: Number,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  UpdatedAt: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
  },
});

module.exports = Post = mongoose.model('post', PostSchema);
