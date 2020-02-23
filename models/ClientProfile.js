const mongoose = require('mongoose');

const ClientProfileSchema = mongoose.Schema({
    address:{
        locality:{
            type: String,
            required: true
        },
        city:{
            type: String,
            required: true
        },
        pincode:{
            type: Number,
            default: 111111
        }
    }
});

module.exports = ClientProfile = mongoose.model('clientprofile', ClientProfileSchema);