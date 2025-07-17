
const express = require('express');
const router = express.Router();

// --- Middleware Imports ---
// The path '../' goes up one level from the 'routes' directory to the 'src' directory,
// then into 'middlewares'.
const { authenticateToken, isAdmin } = require('../middlewares/auth.middleware');

// --- Route Module Imports ---
// The path './' refers to the current directory (src/routes).
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const requestRoutes = require('./request.routes');
const adminRoutes = require('./admin.routes');

// --- Route Mounting ---

// Mount authentication routes (e.g., /api/auth/login, /api/auth/register)
router.use('/auth', authRoutes);

// Mount user-related routes (e.g., /api/users/donors, /api/users/profile)
router.use('/users', userRoutes);

// Mount blood request routes (e.g., /api/requests/my-requests)
router.use('/requests', requestRoutes);

// Mount admin-only routes.
// Any request to a path starting with /api/admin will first be checked by
// authenticateToken, then by isAdmin, before being passed to the adminRoutes handler.
// router.use('/admin', authenticateToken, isAdmin, adminRoutes);
router.use('/admin', adminRoutes);
// router.use('/admin',adm);

module.exports = router;
