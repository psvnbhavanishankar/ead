const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'lawyer',
  },

  title: {
    type: String,
    reuired: true,
  },

  content: {
    type: String,
    reuired: true,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Blog = mongoose.model('blog', BlogSchema);
