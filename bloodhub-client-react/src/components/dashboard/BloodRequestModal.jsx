import React, { useState } from 'react';
import api from '../../api/axios';
import { X } from 'lucide-react';

const BloodRequestModal = ({ donor, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        hospitalName: '',
        requestDate: '',
        requesterContact: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!donor) {
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Access donor._id directly here to ensure it's available.
        const payload = {
            donorId: donor._id,
            hospitalName: formData.hospitalName.trim(),
            requestDate: formData.requestDate,
            requesterContact: formData.requesterContact.trim(),
        };

        try {
            await api.post('/requests', payload);
            onSuccess('Blood request submitted successfully!');
            onClose();
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'Failed to submit request.');
            } else {
                setError('An error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <X size={24} />
                </button>
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Request Blood From</h2>
                    <p className="text-xl font-semibold text-red-600 mb-6">{donor.username}</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="hospitalName">Hospital Name</label>
                            <input id="hospitalName" name="hospitalName" type="text" onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition" required />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="requestDate">Required Date</label>
                            <input id="requestDate" name="requestDate" type="date" onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition" required />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="requesterContact">Your Contact Number</label>
                            <input id="requesterContact" name="requesterContact" type="tel" onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition" required />
                        </div>

                        {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}
                        
                        <div className="pt-4">
                            <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg disabled:bg-gray-400">
                                {loading ? 'Submitting...' : 'Submit Request'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BloodRequestModal;
