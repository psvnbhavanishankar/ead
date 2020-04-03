const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Client = mongoose.model('client', ClientSchema);