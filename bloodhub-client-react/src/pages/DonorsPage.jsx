/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Search, Heart, Map, ChevronDown, MapPin } from 'lucide-react';
import DonorCard from '../pages/DonorCard';
import api from '../api/axios'; // Import the central axios instance

// These can be kept for the filter dropdowns
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const divisions = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'];

const CustomSelect = ({ icon: Icon, options, placeholder, onChange }) => (
    <div className="relative w-full">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <select onChange={onChange} className="w-full appearance-none rounded-full border-2 border-gray-200 bg-white py-3 pl-12 pr-10 text-gray-700 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 transition-all">
            <option value="">{placeholder}</option>
            {options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
    </div>
);

const DonorsPage = () => {
    // State for API data and filters
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // State for user inputs
    const [searchTerm, setSearchTerm] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [division, setDivision] = useState('');
    const [district, setDistrict] = useState('');
    const [thana, setThana] = useState('');

    // Fetch data from the API when filters change
    useEffect(() => {
        const fetchDonors = async () => {
            setLoading(true);
            setError('');
            try {
                // Build query parameters for the API call
                const params = new URLSearchParams();
                if (bloodGroup) params.append('bloodType', bloodGroup);
                if (division) params.append('division', division);
                if (district) params.append('district', district.trim());
                if (thana) params.append('thana', thana.trim());
                
                // Make the API call using our axios instance
                const response = await api.get('/users/donors', { params });
                setDonors(response.data);
            } catch (err) {
                setError('Failed to fetch donors. Please try again later.');
                // console.error(err);
            } finally {
                setLoading(false);
            }
        };

        // Debounce the fetch call to avoid too many API requests while typing
        const handler = setTimeout(() => {
            fetchDonors();
        }, 500); // Wait 500ms after user stops typing

        return () => {
            clearTimeout(handler);
        };

    }, [bloodGroup, division, district, thana]); // Re-run this effect when filters change

    // Client-side filtering for the search term (name)
    const filteredDonors = donors.filter(donor =>
        donor.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            <section className="bg-white shadow-inner">
                <div className="container mx-auto px-6 py-8">
                    <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-2">Find a Blood Donor</h1>
                    <p className="text-center text-gray-600 mb-8">Search for heroes in your area willing to save a life.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-6 bg-red-50/50 rounded-xl border border-red-100">
                        {/* Search by Name */}
                        <div className="relative lg:col-span-2">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-full border-2 border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-700 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 transition-all"
                            />
                        </div>
                        {/* Filter by Blood Group */}
                        <CustomSelect icon={Heart} options={bloodGroups} placeholder="Blood Group" onChange={(e) => setBloodGroup(e.target.value)} />
                        {/* Filter by Division */}
                        <CustomSelect icon={Map} options={divisions} placeholder="Division" onChange={(e) => setDivision(e.target.value)} />
                        {/* Filter by District */}
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="District..."
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                className="w-full rounded-full border-2 border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-700 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 transition-all"
                            />
                        </div>
                        {/* Filter by Thana - This will now be part of the grid */}
                        <div className="relative md:col-span-2 lg:col-span-1">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Thana / Upazila..."
                                value={thana}
                                onChange={(e) => setThana(e.target.value)}
                                className="w-full rounded-full border-2 border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-700 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 transition-all"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="container mx-auto px-6 py-12">
                {loading ? (
                    <div className="text-center py-20 text-lg font-semibold">Loading donors...</div>
                ) : error ? (
                    <div className="text-center py-20 text-red-500">{error}</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredDonors.map(donor => <DonorCard key={donor._id} donor={donor} />)}
                        </div>
                        {filteredDonors.length === 0 && (
                            <div className="text-center py-20">
                                <h3 className="text-2xl font-bold text-gray-700">No Donors Found</h3>
                                <p className="text-gray-500 mt-2">Try adjusting your filters or search term.</p>
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};

export default DonorsPage;
