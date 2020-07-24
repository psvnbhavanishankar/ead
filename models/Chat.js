//model

const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
  client: [
    {
      type: String,
    },
  ],
  lawyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'lawyer',
  },
});

module.exports = Chat = mongoose.model('chat', ChatSchema);
