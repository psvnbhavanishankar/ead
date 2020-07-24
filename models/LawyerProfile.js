const mongoose = require('mongoose');

const LawyerProfileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'lawyer',
  },

  address: {
    locality: {
      type: String,
    },
    city: {
      type: String,
    },
    pincode: {
      type: Number,
    },
  },

  experience: [
    {
      type: String,
    },
  ],

  practice_areas: [
    {
      type: String,
    },
  ],

  licensed_year: {
    type: Number,
  },

  image: {
    type: String,
  },

  mobile: {
    type: String,
  },

  endorsments_given: [
    {
      type: String,
    },
  ],

  endorsments_got: [
    {
      type: String,
    },
  ],
  price: {
    type: Number,
  },
});

module.exports = LawyerProfile = mongoose.model(
  'lawyerprofile',
  LawyerProfileSchema
);
