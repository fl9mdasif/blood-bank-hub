import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Logo from '../components/Logo'; // Make sure this path is correct
import api from '../../api/axios'; // Import the central axios instance

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const divisions = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'];
const availabilityOptions = ['Available', 'Unavailable'];

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        contact: '',
        isDonor: true, // Default to true for this registration form
        bloodType: '',
        division: '',
        district: '',
        thana: '',
        availability: 'Available',
        photo: '', // Storing photo URL as a string for now
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        console.log('reg',formData)
        // Create a clean payload object from the state to ensure data integrity
        const payload = {
            username: formData.username.trim(),
            email: formData.email.trim(),
            password: formData.password, // Don't trim passwords
            contact: formData.contact.trim(),
            isDonor: formData.isDonor,
            bloodType: formData.bloodType,
            division: formData.division,
            district: formData.district.trim(),
            thana: formData.thana.trim(),
            availability: formData.availability,
            photo: formData.photo.trim(),
        };

        // Log the exact data being sent to the API for debugging
        console.log("Sending this payload:", payload);

        try {
            // Use the 'api' instance to make the POST request with the clean payload
            await api.post('/auth/register', payload);
            
            // On successful registration, redirect to the login page with a success message
            navigate('/login?status=success');

        } catch (err) {
            // Handle registration errors from the API
            if (err.response && err.response.data) {
                setError(err.response.data.error || 'Registration failed. Please try again.');
            } else {
                // Handle network errors or other issues
                setError('Registration failed. Please check your connection and try again.');
            }
        } finally {
            // Stop the loading indicator
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] bg-red-50 flex items-center justify-center p-4 py-12">
            <div className="w-full max-w-2xl">
                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                    <div className="text-center mb-8">
                        {/* <Logo /> */}
                        <h2 className="mt-4 text-3xl font-extrabold text-gray-800">Become a Donor</h2>
                        <p className="text-gray-500 mt-2">Join our community of heroes by filling out the form below.</p>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Username</label>
                                <input name="username" type="text" onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition" required />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Email</label>
                                <input name="email" type="email" onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition" required />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Password</label>
                                <input name="password" type="password" onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition" required />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Contact Number</label>
                                <input name="contact" type="tel" onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition" required />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Blood Group</label>
                                <select name="bloodType" onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition" required>
                                    <option value="">Select Blood Group</option>
                                    {bloodGroups.map(group => <option key={group} value={group}>{group}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Availability</label>
                                <select name="availability" onChange={handleChange} value={formData.availability} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition">
                                    {availabilityOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Division</label>
                                <select name="division" onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition" required>
                                    <option value="">Select Division</option>
                                    {divisions.map(div => <option key={div} value={div}>{div}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">District</label>
                                <input name="district" type="text" onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition" required />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-gray-700 font-medium mb-2">Thana / Upazila</label>
                                <input name="thana" type="text" onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition" required />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-gray-700 font-medium mb-2">Profile Picture URL</label>
                                <input name="photo" type="text" placeholder="https://example.com/image.png" onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition "required />
                            </div>
                        </div>
                        
                        {error && <p className="text-sm text-center text-red-600 bg-red-100 p-3 rounded-lg mt-6">{error}</p>}

                        <div>
                            <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </div>
                    </form>
                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            Already have an account?
                            <Link to="/login" className="font-medium text-red-600 hover:underline ml-1">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
