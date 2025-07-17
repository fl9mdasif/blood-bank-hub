// models/user.model.js
const mongoose = require('mongoose');

// --- User Schema ---
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    isDonor: { type: Boolean, default: false },
    bloodType: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', null] },
    location: { type: String, trim: true },
    availability: { type: String, enum: ['Available', 'Unavailable'], default: 'Available' },
    photo: { type: String, default: '' }, // URL to a photo
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    accountStatus: { type: String, enum: ['active', 'deactivated'], default: 'active' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;