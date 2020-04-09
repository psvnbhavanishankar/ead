//model

const mongoose = require('mongoose');

const CaseSchema = mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'client',
  },
  lawyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'lawyer',
  },
  title: {
    type: String,
    default: '',
  },
  description: [
    {
      type: String,
    },
  ],
  payment_status: {
    type: Boolean,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Case = mongoose.model('case', CaseSchema);
