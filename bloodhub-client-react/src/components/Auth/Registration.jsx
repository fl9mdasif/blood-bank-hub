import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import Logo from './Logo';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const divisions = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'];
const availabilityOptions = ['Available', 'Unavailable'];

// This component is now used for both Login and a dedicated Donor Registration page.
const Registration = ({ isLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        contact: '',
        // For registration, isDonor will always be true now.
        isDonor: !isLogin, 
        bloodType: '',
        division: '',
        district: '',
        thana: '',
        availability: 'Available',
        photo: null,
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you would send this data to your API
        console.log('Form Submitted:', formData);
        alert('Form submitted! Check the console for the data.');
    };

    return (
        <div className="min-h-[80vh] bg-red-50 flex items-center justify-center p-4 py-12">
            <div className="w-full max-w-2xl">
                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                    <div className="text-center mb-8">
                        {/* <Logo /> */}
                        <h2 className="mt-4 text-3xl font-extrabold text-gray-800">{isLogin ? "Welcome Back!" : "Become a Donor"}</h2>
                        <p className="text-gray-500 mt-2">{isLogin ? "Log in to continue your journey." : "Join our community of heroes by filling out the form below."}</p>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Login Fields */}
                        {isLogin && (
                            <>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                                    <input name="email" type="email" onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition"/>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Password</label>
                                    <input name="password" type="password" onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition"/>
                                </div>
                            </>
                        )}

                        {/* Registration Fields - Now always visible on the registration page */}
                        {!isLogin && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Username</label>
                                    <input name="username" type="text" onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition"/>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                                    <input name="email" type="email" onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition"/>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Password</label>
                                    <input name="password" type="password" onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition"/>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Contact Number</label>
                                    <input name="contact" type="tel" onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition"/>
                                </div>
                                
                                {/* All donor fields are now part of the main form */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Blood Group</label>
                                    <select name="bloodType" onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition">
                                        <option value="">Select Blood Group</option>
                                        {bloodGroups.map(group => <option key={group} value={group}>{group}</option>)}
                                    </select>
                                </div>
                                 <div>
                                    <label className="block text-gray-700 font-medium mb-2">Availability</label>
                                    <select name="availability" onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition">
                                        {availabilityOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Division</label>
                                    <select name="division" onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition">
                                        <option value="">Select Division</option>
                                        {divisions.map(div => <option key={div} value={div}>{div}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">District</label>
                                    <input name="district" type="text" onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition"/>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 font-medium mb-2">Thana / Upazila</label>
                                    <input name="thana" type="text" onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition"/>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 font-medium mb-2">Profile Picture</label>
                                    <input name="photo" type="text" onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition"/>
                                </div>
                                 
                            </div>
                        )}
                        
                        <div>
                            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg mt-4">
                                {isLogin ? "Log In" : "Create Account"}
                            </button>
                        </div>
                    </form>
                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <Link to={isLogin ? "/register" : "/login"} className="font-medium text-red-600 hover:underline ml-1">
                                {isLogin ? "Sign up" : "Log in"}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
