const mongoose = require('mongoose');

const LawyerProfileSchema = mongoose.Schema({
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
    },

    experience:[{
        type: String,
        required: true
    }],

    practice_areas:[{
        type: String,
    }],

    licensed_year:{
        type: Number,
        required: true
    }
});

module.exports = LawyerProfile = mongoose.model('lawyerprofile', LawyerProfileSchema);