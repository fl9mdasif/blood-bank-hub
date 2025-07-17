// controllers/admin.controller.js
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// --- Create a new user (for admin) with DEBUG LOGS ---
exports.createUser = async (req, res) => {
    try {
        const { username, email, password, isDonor, bloodType, location, role, accountStatus } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required.' });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            return res.status(400).json({ message: 'User with this email or username already exists.' });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            isDonor: isDonor || false,
            bloodType: isDonor ? bloodType : null,
            location: isDonor ? location : null,
            role: role || 'user',
            accountStatus: accountStatus || 'active'
        });

        await newUser.save();
        
        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({ message: 'User created successfully by admin.', user: userResponse });

    } catch (error) {
        res.status(500).json({ message: 'Server error during user creation.', error: error.message });
    }
};

// --- Get all users (for admin) ---
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users.', error: error.message });
    }
};


// --- Update a user's role or status (for admin) ---
exports.updateUser = async (req, res) => {
    try {
        const { role, accountStatus } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id, 
            { role, accountStatus }, 
            { new: true }
        ).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json({ message: 'User updated successfully.', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user.', error: error.message });
    }
};

