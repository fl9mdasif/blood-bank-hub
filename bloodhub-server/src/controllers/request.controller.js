// controllers/request.controller.js
const BloodRequest = require('../models/bloodRequest.model');
const User = require('../models/user.model');

// --- Create a blood request ---
exports.createRequest = async (req, res) => {
    try {
        const { donorId, hospitalName, requestDate, requesterContact } = req.body;
        const newRequest = new BloodRequest({
            requester: req.user.id,
            donor: donorId,
            hospitalName,
            requestDate,
            requesterContact
        });
        await newRequest.save();
        res.status(201).json({ message: 'Blood request submitted successfully.', request: newRequest });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting request.', error: error.message });
    }
};

// --- Get requests made by the user ---
exports.getMyRequests = async (req, res) => {
    try {
        const requests = await BloodRequest.find({ requester: req.user.id })
            .populate('donor', 'username bloodType location photo');
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching your requests.', error: error.message });
    }
};

// --- Get requests made to the user ---
exports.getRequestsToMe = async (req, res) => {
    try {
        const requests = await BloodRequest.find({ donor: req.user.id })
            .populate('requester', 'username email');
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching requests for you.', error: error.message });
    }
};

// --- Update request status (approve/reject) ---
// exports.updateRequestStatus = async (req, res) => {
//     try {
//         const { status } = req.body; // 'approved' or 'rejected'
//         const request = await BloodRequest.findById(req.params.id);

//         if (!request) {
//             return res.status(404).json({ message: 'Request not found.' });
//         }

//         if (request.donor.toString() !== req.user.id) {
//             return res.status(403).json({ message: 'You are not authorized to update this request.' });
//         }

//         request.status = status;
//         await request.save();
//         res.json({ message: `Request ${status}.`, request });
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating request status.', error: error.message });
//     }
// };


exports.updateRequestStatus = async (req, res) => {
    try {
        const { status } = req.body; // 'approved' or 'rejected'
        const request = await BloodRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ message: 'Request not found.' });
        }

        if (request.donor.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to update this request.' });
        }

        request.status = status;
        await request.save();

        // 2. ADD THIS NEW LOGIC:
        // If the request was approved, find the donor and update their availability.
        if (status === 'approved') {
            await User.findByIdAndUpdate(request.donor, {
                availability: 'Unavailable'
            });
        }

        res.json({ message: `Request ${status}.`, request });
    } catch (error) {
        res.status(500).json({ message: 'Error updating request status.', error: error.message });
    }
};