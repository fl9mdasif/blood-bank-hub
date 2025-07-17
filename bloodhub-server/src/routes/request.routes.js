// routes/request.routes.js
const express = require('express');
const router = express.Router();
const requestController = require('../controllers/request.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

// All request routes are private
router.use(authenticateToken);

router.post('/', requestController.createRequest);
router.get('/my-requests', requestController.getMyRequests);
router.get('/to-me', requestController.getRequestsToMe);
router.put('/:id', requestController.updateRequestStatus);

module.exports = router;
