// models/bloodRequest.model.js
const mongoose = require('mongoose');

// --- Blood Request Schema ---
const bloodRequestSchema = new mongoose.Schema({
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    hospitalName: { type: String },
    requestDate: { type: Date },
    requesterContact: { type: String }
}, { timestamps: true });

const BloodRequest = mongoose.model('BloodRequest', bloodRequestSchema);

module.exports = BloodRequest;
