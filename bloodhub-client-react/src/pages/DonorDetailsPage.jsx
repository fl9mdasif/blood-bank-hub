import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Heart, Calendar } from 'lucide-react';
import api from '../api/axios'; // Import the central axios instance

// Helper for conditional class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

const DonorDetailsPage = () => {
    // Get the donor ID from the URL
    const { id } = useParams();
    
    // State for storing donor data, loading status, and errors
    const [donor, setDonor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch the specific donor's data when the component mounts
    useEffect(() => {
        const fetchDonor = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/users/donors/${id}`);
                setDonor(response.data);
            } catch (err) {
                setError('Could not fetch donor details. The donor may not exist.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDonor();
    }, [id]); // Re-run the effect if the ID in the URL changes

    // Handle loading state
    if (loading) {
        return <div className="text-center py-20 text-lg font-semibold">Loading Donor Profile...</div>;
    }

    // Handle error state
    if (error || !donor) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold text-gray-700">Donor Not Found</h1>
                <p className="text-gray-500 mt-2">{error || 'The donor you are looking for does not exist.'}</p>
            </div>
        );
    }

    // Determine availability and construct full location from API data
    const isAvailable = donor.availability === 'Available';
    const fullLocation = [donor.thana, donor.district, donor.division].filter(Boolean).join(', ');

    return (
        <div className="bg-gray-50 py-12 md:py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header Section with Profile Image */}
                    <div className="h-48 bg-red-100 flex items-center justify-center relative">
                         <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10" style={{backgroundImage: 'url(https://www.toptal.com/designers/subtlepatterns/uploads/watercolor.png)'}}></div>
                        <img 
                            src={donor.photo || `https://i.pravatar.cc/150?u=${donor._id}`} 
                            alt={donor.username} 
                            className="w-32 h-32 rounded-full border-8 border-white shadow-xl z-10" 
                            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150/fecaca/ef4444?text=Donor'; }}
                        />
                    </div>

                    {/* Name and Availability Section */}
                    <div className="text-center p-6 -mt-16 bg-white relative pt-20">
                        <h1 className="text-4xl font-extrabold text-gray-800">{donor.username}</h1>
                        <p className="text-lg text-red-600 font-bold mt-1">Blood Group: {donor.bloodType}</p>
                        <div className={cn("mt-4 inline-block px-4 py-1.5 text-sm font-semibold text-white rounded-full", isAvailable ? "bg-green-500" : "bg-yellow-500")}>
                            {donor.availability}
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="border-t border-gray-200 p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                        <div className="flex flex-col items-center">
                            <MapPin className="h-8 w-8 text-red-500 mb-2" />
                            <span className="text-sm text-gray-500">Location</span>
                            <span className="text-lg font-semibold text-gray-800">{fullLocation || 'Not specified'}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <Calendar className="h-8 w-8 text-red-500 mb-2" />
                            <span className="text-sm text-gray-500">Joined On</span>
                            <span className="text-lg font-semibold text-gray-800">{new Date(donor.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>

                    {/* Action Button Section */}
                     <div className="p-8 border-t border-gray-200">
                         <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-5 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl text-lg">
                            Request Blood
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonorDetailsPage;
