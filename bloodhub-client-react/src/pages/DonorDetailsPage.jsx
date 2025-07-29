import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Heart, Calendar, Phone } from 'lucide-react';
import api from '../api/axios';
import BloodRequestModal from '../components/dashboard/BloodRequestModal';

// Helper for conditional class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

const DonorDetailsPage = () => {
    const { id } = useParams();
    const [donor, setDonor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showContactInfo, setShowContactInfo] = useState(false);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            setError("No donor ID provided in the URL.");
            return;
        }

        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                setLoading(true);
                const donorPromise = api.get(`/users/donors/${id}`);
                const requestsPromise = token ? api.get('/requests/my-requests') : Promise.resolve({ data: [] });

                const [donorResponse, requestsResponse] = await Promise.all([donorPromise, requestsPromise]);
                
                const fetchedDonor = donorResponse.data;
                
                const approvedRequest = requestsResponse.data.find(
                    req => req.donor._id === fetchedDonor._id && req.status === 'approved'
                );

                if (approvedRequest) {
                    setShowContactInfo(true);
                    // If a request is approved, update the local state to show contact info
                    // and set the donor's availability to 'Unavailable' for the UI.
                    setDonor({ 
                        ...fetchedDonor, 
                        contact: approvedRequest.donor.contact || '01234567890',
                        availability: 'Unavailable' // Set availability to unavailable
                    });
                } else {
                    setDonor(fetchedDonor);
                }

            } catch (err) {
                let errorMessage = 'An unexpected error occurred.';
                if (err.response) {
                    console.error("API Error Response:", err.response.data);
                    if (err.response.status === 404) {
                        errorMessage = "No donor was found with this ID.";
                    } else {
                        errorMessage = `Server Error: ${err.response.data.message || 'Please try again later.'}`;
                    }
                } else if (err.request) {
                    errorMessage = "The server is not responding. Please check your connection.";
                } else {
                    errorMessage = err.message;
                }
                setError(errorMessage);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleSuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(''), 4000);
    };

    if (loading) {
        return <div className="text-center py-20 text-lg font-semibold">Loading Donor Profile...</div>;
    }

    if (error || !donor) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold text-gray-700">Failed to Load Profile</h1>
                <p className="text-red-500 mt-2">{error}</p>
            </div>
        );
    }

    const isAvailable = donor.availability === 'Available';
    const fullLocation = [donor.thana, donor.district, donor.division].filter(Boolean).join(', ');

    return (
        <>
            <div className="bg-gray-50 py-12 md-py-20">
                <div className="container mx-auto px-6">
                    {successMessage && (
                        <div className="max-w-4xl mx-auto bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-md mb-8" role="alert">
                            <p className="font-bold">Success</p>
                            <p>{successMessage}</p>
                        </div>
                    )}

                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="h-48 bg-red-100 flex items-center justify-center relative">
                            <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10" style={{backgroundImage: 'url(https://www.toptal.com/designers/subtlepatterns/uploads/watercolor.png)'}}></div>
                            <img src={donor.photo || `https://i.pravatar.cc/150?u=${donor._id}`} alt={donor.username} className="w-32 h-32 rounded-full border-8 border-white shadow-xl z-10" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150/fecaca/ef4444?text=Donor'; }}/>
                        </div>
                        <div className="text-center p-6 -mt-16 bg-white relative pt-20">
                            <h1 className="text-4xl font-extrabold text-gray-800">{donor.username}</h1>
                            <p className="text-lg text-red-600 font-bold mt-1">Blood Group: {donor.bloodType}</p>
                            <div className={cn("mt-4 inline-block px-4 py-1.5 text-sm font-semibold text-white rounded-full", isAvailable ? "bg-green-500" : "bg-yellow-500")}>{donor.availability}</div>
                        </div>
                        
                        {showContactInfo && (
                            <div className="bg-green-50 border-t border-b border-green-200 p-6 text-center">
                                <h3 className="text-lg font-bold text-green-800">Request Approved!</h3>
                                <p className="text-green-700">You can now contact the donor directly.</p>
                                <div className="mt-4 flex items-center justify-center">
                                    <Phone className="h-6 w-6 text-green-600 mr-2" />
                                    <a href={`tel:${donor.contact}`} className="text-2xl font-bold text-green-800 hover:underline">{donor.contact}</a>
                                </div>
                            </div>
                        )}

                        <div className="border-t border-gray-200 p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                            <div className="flex flex-col items-center"><MapPin className="h-8 w-8 text-red-500 mb-2" /><span className="text-sm text-gray-500">Location</span><span className="text-lg font-semibold text-gray-800">{fullLocation || 'Not specified'}</span></div>
                            <div className="flex flex-col items-center"><Calendar className="h-8 w-8 text-red-500 mb-2" /><span className="text-sm text-gray-500">Joined On</span><span className="text-lg font-semibold text-gray-800">{new Date(donor.createdAt).toLocaleDateString()}</span></div>
                        </div>

                        <div className="p-8 border-t border-gray-200">
                            <button 
                                onClick={() => setIsModalOpen(true)} 
                                disabled={!isAvailable || showContactInfo} 
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-5 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {showContactInfo ? 'Request Approved' : (isAvailable ? 'Request Blood' : 'Currently Unavailable')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && <BloodRequestModal donor={donor} onClose={() => setIsModalOpen(false)} onSuccess={handleSuccess} />}
        </>
    );
};

export default DonorDetailsPage;
