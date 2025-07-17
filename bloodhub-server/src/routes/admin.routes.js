// src/routes/admin.routes.js
// =================================================================
//                      ADMIN ROUTES
// =================================================================
// This file defines the API endpoints for administrative functionalities.
// The middleware to protect these routes (authenticateToken, isAdmin)
// is applied in the main router (src/routes/index.js), so we only
// need to define the specific route paths and their corresponding
// controller functions here.
// =================================================================

const express = require('express');
const router = express.Router();

// --- Controller Import ---
// The path '../' goes up one level from 'routes' to 'src', then into 'controllers'.

const adminController = require('../controllers/admin.controller');
const authController = require('../controllers/auth.controller');
// --- Route Definitions ---

// GET /api/admin/users
// Fetches a list of all user accounts in the system.
router.get('/getall', adminController.getAllUsers);
router.post('/create',adminController.createUser);

// PUT /api/admin/users/:id
// Updates a specific user's account, allowing an admin to change their
// role (e.g., 'user' to 'admin') or account status ('active' to 'deactivated').
router.put('/user/:id', adminController.updateUser);

module.exports = router;
