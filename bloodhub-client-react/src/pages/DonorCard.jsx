import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

// Helper for conditional class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

const DonorCard = ({ donor }) => {
    // Construct a full location string from the available data
    const fullLocation = [donor.thana, donor.district, donor.division].filter(Boolean).join(', ');
    
    // Determine availability based on the string value from the API
    const isAvailable = donor.availability === 'Available';

    return (
        <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 group flex flex-col">
            <div className="relative">
                {/* Use donor.photo for the image source */}
                <img 
                    className="w-full h-48 object-cover" 
                    src={donor.photo} // Use a fallback image if no photo is provided
                    alt={donor.username} 
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x300/fecaca/ef4444?text=No+Image'; }} // Fallback for broken image links
                />
                <div className={cn("absolute top-3 right-3 px-3 py-1 text-xs font-bold text-white rounded-full", isAvailable ? "bg-green-500" : "bg-yellow-500")}>
                    {donor.availability}
                </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center mb-3">
                    <div className="flex-shrink-0 mr-3 w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center text-3xl font-extrabold border-4 border-white -mt-10 shadow-md">
                        {donor.bloodType}
                    </div>
                    {/* Use donor.username for the name */}
                    <h3 className="text-xl font-bold text-gray-800">{donor.username}</h3>
                </div>
                {/* Display the full, constructed location */}
                <p className="text-gray-600 flex items-center mb-4 text-sm">
                    <MapPin size={16} className="mr-2 flex-shrink-0" /> 
                    {fullLocation || 'Location not specified'}
                </p>
                <div className="mt-auto">
                    {/* Use donor._id for the link */}
                    <Link to={`/donors/${donor._id}`} className="w-full block text-center bg-red-100 text-red-600 hover:bg-red-600 hover:text-white font-bold py-3 px-5 rounded-lg transition-colors duration-300">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DonorCard;
