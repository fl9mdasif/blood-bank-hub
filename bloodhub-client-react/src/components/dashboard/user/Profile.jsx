/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { User, Mail, Phone, MapPin, Droplet, CheckCircle } from 'lucide-react';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/users/profile');
                setProfile(response.data);
            } catch (err) {
                setError('Failed to fetch profile data.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleAvailabilityChange = async (e) => {
        const newAvailability = e.target.value;
        
        // Optimistically update the UI
        setProfile(prevProfile => ({ ...prevProfile, availability: newAvailability }));
        
        try {
            await api.put('/users/profile', { availability: newAvailability });
            setUpdateMessage('Availability updated successfully!');
            setTimeout(() => setUpdateMessage(''), 3000); // Clear message after 3 seconds
        } catch (err) {
            setError('Failed to update availability. Please try again.');
            // Revert the change if the API call fails
            setProfile(prevProfile => ({ ...prevProfile, availability: profile.availability }));
        }
    };

    if (loading) {
        return <div className="text-center">Loading profile...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    if (!profile) {
        return <div className="text-center">No profile data found.</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>
            
            {updateMessage && <p className="text-sm text-green-600 bg-green-100 p-3 rounded-lg mb-6">{updateMessage}</p>}

            <div className="space-y-6">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <User className="h-6 w-6 mr-4 text-gray-500" />
                    <div>
                        <p className="text-sm text-gray-500">Username</p>
                        <p className="text-lg font-semibold">{profile.username}</p>
                    </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <Mail className="h-6 w-6 mr-4 text-gray-500" />
                    <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-lg font-semibold">{profile.email}</p>
                    </div>
                </div>
                {profile.isDonor && (
                    <>
                        <div className="flex items-center p-4 bg-red-50 rounded-lg">
                            <Droplet className="h-6 w-6 mr-4 text-red-500" />
                            <div>
                                <p className="text-sm text-red-700">Blood Group</p>
                                <p className="text-lg font-semibold text-red-900">{profile.bloodType}</p>
                            </div>
                        </div>
                        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <MapPin className="h-6 w-6 mr-4 text-gray-500" />
                            <div>
                                <p className="text-sm text-gray-500">Location</p>
                                <p className="text-lg font-semibold">{profile.thana}, {profile.district}, {profile.division}</p>
                            </div>
                        </div>
                         <div className="flex items-center p-4 bg-gray-50 rounded-lg justify-between">
                            <div className="flex items-center">
                                <CheckCircle className="h-6 w-6 mr-4 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Availability</p>
                                    <p className="text-lg font-semibold">{profile.availability}</p>
                                </div>
                            </div>
                            <div>
                                <select 
                                    value={profile.availability}
                                    onChange={handleAvailabilityChange}
                                    className="p-2 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                >
                                    <option value="Available">Available</option>
                                    <option value="Unavailable">Unavailable</option>
                                </select>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
