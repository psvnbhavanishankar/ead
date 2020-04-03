const mongoose = require('mongoose');

const FieldSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = Field = mongoose.model('field', FieldSchema);
