import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import Logo from '../components/Logo'; // Assuming Logo component is in ../components/

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you would send this data to your API for authentication
        console.log('Login Form Submitted:', formData);
        alert(`Attempting to log in with email: ${formData.email}`);
    };

    return (
        <div className="min-h-[80vh] bg-red-50 flex items-center justify-center p-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                    {/* Header */}
                    <div className="text-center mb-8">
                        {/* <Logo /> */}BloodHub 
                        <h2 className="mt-4 text-3xl font-extrabold text-gray-800">Welcome Back!</h2>
                        <p className="text-gray-500 mt-2">Log in to continue your journey.</p>
                    </div>

                    {/* Login Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input 
                                id="email"
                                name="email" 
                                type="email" 
                                value={formData.email}
                                onChange={handleChange} 
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                                Password
                            </label>
                            <input 
                                id="password"
                                name="password" 
                                type="password" 
                                value={formData.password}
                                onChange={handleChange} 
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition"
                                required
                            />
                        </div>
                        
                        {/* Submit Button */}
                        <div>
                            <button 
                                type="submit" 
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg mt-4"
                            >
                                Log In
                            </button>
                        </div>
                    </form>

                    {/* Link to Registration Page */}
                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            Don't have an account?
                            <Link to="/register" className="font-medium text-red-600 hover:underline ml-1">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
