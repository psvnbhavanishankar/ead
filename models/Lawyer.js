const mongoose = require('mongoose');

const LawyerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  enrollmentno: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  isVerified: {
    type: Boolean,
    default: false
  }
});

module.exports = Lawyer = mongoose.model('lawyer', LawyerSchema);
