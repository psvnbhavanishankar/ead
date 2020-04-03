const mongoose = require('mongoose');

const TokenLawyerSchema = mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Client' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

module.exports = TokenLawyer = mongoose.model('tokenlawyer', TokenLawyerSchema);