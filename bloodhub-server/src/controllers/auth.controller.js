// controllers/auth.controller.js
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_ACCESS_SECRET ;

// --- Register a new user ---
exports.register = async (req, res) => {
    try {
        const { username, email, password,contact,photo, isDonor, bloodType, division,thana, district, } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email or username already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            contact,
            password: hashedPassword,
            isDonor,
            division,
            district,
            thana,
            bloodType: isDonor ? bloodType : null,
            photo
            // location: isDonor ? location : null
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.' });

    } catch (error) {
        res.status(500).json({ message: 'Server error during registration.', error: error.message });
    }
};

// --- Login a user ---
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || user.accountStatus === 'deactivated') {
            return res.status(400).json({ message: 'Invalid credentials or account deactivated.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const payload = { id: user._id, username: user.username, role: user.role };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

        res.json({
            message: 'Logged in successfully.',
            token,
            user: { id: user._id, username: user.username, email: user.email, role: user.role }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error during login.', error: error.message });
    }
};
 