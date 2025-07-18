import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

// Helper for conditional class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

const DonorCard = ({ donor }) => (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 group flex flex-col">
        <div className="relative">
            <img className="w-full h-48 object-cover" src={donor.image} alt={donor.name} />
            <div className={cn("absolute top-3 right-3 px-3 py-1 text-xs font-bold text-white rounded-full", donor.available ? "bg-green-500" : "bg-yellow-500")}>
                {donor.available ? "Available" : "Unavailable"}
            </div>
        </div>
        <div className="p-5 flex flex-col flex-grow">
            <div className="flex items-center mb-3">
                <div className="flex-shrink-0 mr-3 w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center text-3xl font-extrabold border-4 border-white -mt-10 shadow-md">
                    {donor.bloodGroup}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{donor.name}</h3>
            </div>
            <p className="text-gray-600 flex items-center mb-4"><MapPin size={16} className="mr-2" /> {donor.location}</p>
            <div className="mt-auto">
                <Link to={`/donors/${donor.id}`} className="w-full block text-center bg-red-100 text-red-600 hover:bg-red-600 hover:text-white font-bold py-3 px-5 rounded-lg transition-colors duration-300">
                    View Details
                </Link>
            </div>
        </div>
    </div>
);

export default DonorCard;
