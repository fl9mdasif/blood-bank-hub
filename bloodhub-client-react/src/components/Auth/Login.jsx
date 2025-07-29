// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// // import Logo from '../components/Logo'; // Make sure this path is correct
// import api from '../../api/axios'; // Import the central axios instance

// const LoginPage = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//     });
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setLoading(true);

//         try {
//             // Use the 'api' instance to make the POST request
//             const response = await api.post('/auth/login', formData);
            
//             // Extract the token from the server's response
//             const { token } = response.data;

//             // Store the token in localStorage for future authenticated requests
//             localStorage.setItem('token', token);

//             // Redirect the user to their dashboard upon successful login
//             navigate('/dashboard');

//             console.log('Token',token)

//         } catch (err) {
//             // Handle errors from the API (e.g., wrong password, user not found)
//             if (err.response && err.response.data) {
//                 setError(err.response.data.message || 'Login failed. Please check your credentials.');
//             } else {
//                 // Handle network errors or other issues
//                 setError('Login failed. Please check your connection and try again.');
//             }
//         } finally {
//             // Stop the loading indicator regardless of success or failure
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-[80vh] bg-red-50 flex items-center justify-center p-4 py-12">
//             <div className="w-full max-w-md">
//                 <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
//                     {/* Header */}
//                     <div className="text-center mb-8">
//                         {/* <Logo /> */}
//                         <h2 className="mt-4 text-3xl font-extrabold text-gray-800">Welcome Back!</h2>
//                         <p className="text-gray-500 mt-2">Log in to continue your journey.</p>
//                     </div>

//                     {/* Login Form */}
//                     <form className="space-y-6" onSubmit={handleSubmit}>
//                         <div>
//                             <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
//                                 Email Address
//                             </label>
//                             <input 
//                                 id="email"
//                                 name="email" 
//                                 type="email" 
//                                 value={formData.email}
//                                 onChange={handleChange} 
//                                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
//                                 Password
//                             </label>
//                             <input 
//                                 id="password"
//                                 name="password" 
//                                 type="password" 
//                                 value={formData.password}
//                                 onChange={handleChange} 
//                                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition"
//                                 required
//                             />
//                         </div>
                        
//                         {/* Display error message if login fails */}
//                         {error && <p className="text-sm text-center text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}

//                         {/* Submit Button */}
//                         <div>
//                             <button 
//                                 type="submit" 
//                                 disabled={loading}
//                                 className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
//                             >
//                                 {loading ? 'Logging in...' : 'Log In'}
//                             </button>
//                         </div>
//                     </form>

//                     {/* Link to Registration Page */}
//                     <div className="text-center mt-6">
//                         <p className="text-sm text-gray-600">
//                             Don't have an account?
//                             <Link to="/register" className="font-medium text-red-600 hover:underline ml-1">
//                                 Sign up
//                             </Link>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Logo from '../components/Logo';
import api from '../../api/axios';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/login', formData);
            const { token } = response.data;
            localStorage.setItem('token', token);

            // Decode the token to check the user's role
            const decodedToken = jwtDecode(token);
            if (decodedToken.role) {
                // navigate('/admin'); // Redirect admins
                navigate('/dashboard/profile'); // Redirect regular users
            }

        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Login failed.');
            } else {
                setError('Login failed. Check connection.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] bg-red-50 flex items-center justify-center p-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                    <div className="text-center mb-8">BLOOD HUB<h2 className="mt-4 text-3xl font-extrabold text-gray-800">Welcome Back!</h2><p className="text-gray-500 mt-2">Log in to continue your journey.</p></div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div><label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email Address</label><input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition" required /></div>
                        <div><label className="block text-gray-700 font-medium mb-2" htmlFor="password">Password</label><input id="password" name="password" type="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition" required /></div>
                        {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}
                        <div><button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg mt-4 disabled:bg-gray-400">{loading ? 'Logging in...' : 'Log In'}</button></div>
                    </form>
                    <div className="text-center mt-6"><p className="text-sm text-gray-600">Don't have an account?<Link to="/register" className="font-medium text-red-600 hover:underline ml-1">Sign up</Link></p></div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
