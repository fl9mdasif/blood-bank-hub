// src/controllers/user.controller.js
const BloodRequest = require('../models/bloodRequest.model');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// --- Search and filter donors ---
exports.searchDonors = async (req, res) => {
    try {
        const { bloodType, division,thana, district, availability } = req.query;
        let filter = { isDonor: true, accountStatus: 'active' };

        if (thana) filter.thana = new RegExp(thana, 'i') ;
        if (district) filter.district = new RegExp(district, 'i') ;
        if (bloodType) filter.bloodType = bloodType; // Exact match is better for blood type
        if (division) filter.division = new RegExp(division, 'i');
        if (availability) filter.availability =  availability;

        const donors = await User.find(filter).select('-password -email');
        res.json(donors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching donors.', error: error.message });
    }
};

// --- Get a single donor's details ---
exports.getDonorDetails = async (req, res) => {
    const donorId = req.params.id;
    try {
        const donor = await User.findById(donorId).select('-password'); // Hide password
        
        if (!donor || !donor.isDonor) {
            return res.status(404).json({ message: 'Donor not found.' });
        }
        res.json(donor);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching donor details.', error: error.message });
    }
};

// --- Get logged-in user's profile ---
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile.', error: error.message });
    }
};

// --- Update user profile ---  <- THIS FUNCTION IS NOW UNCOMMENTED
exports.updateProfile = async (req, res) => {
    try {
        const { username, email, isDonor, bloodType, division,thana, district, availability, photo } = req.body;
        const updatedData = { username, email, isDonor, bloodType, division,thana, district, availability, photo };
        
        const user = await User.findByIdAndUpdate(req.user.id, updatedData, { new: true }).select('-password');
        res.json({ message: 'Profile updated successfully.', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile.', error: error.message });
    }
};

// --- Change user password ---
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect current password.' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ message: 'Password changed successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error changing password.', error: error.message });
    }
};