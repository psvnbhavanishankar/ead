const mongoose = require('mongoose');

const ClientProfileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'client',
  },
  image: {
    type: String,
  },
  address: {
    locality: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    pincode: {
      type: Number,
      default: 111111,
    },
  },
});

module.exports = ClientProfile = mongoose.model(
  'clientprofile',
  ClientProfileSchema
);
