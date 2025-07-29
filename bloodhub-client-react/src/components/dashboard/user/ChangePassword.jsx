import React, { useState } from 'react';
import api from '../../../api/axios';

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        if (formData.newPassword.length < 6) {
            setError("New password must be at least 6 characters long.");
            setLoading(false);
            return;
        }

        try {
            const response = await api.post('/users/change-password', formData);
            setMessage(response.data.message);
            setFormData({ currentPassword: '', newPassword: '' }); // Clear form
        } catch (err) {
            console.log('check error', err);

            
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'Failed to change password.');
            } else {
                setError('An error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Change Password</h1>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
                <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="currentPassword">
                        Current Password
                    </label>
                    <input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="newPassword">
                        New Password
                    </label>
                    <input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition"
                        required
                    />
                </div>

                {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}
                {message && <p className="text-sm text-green-600 bg-green-100 p-3 rounded-lg">{message}</p>}

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg disabled:bg-gray-400"
                    >
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
