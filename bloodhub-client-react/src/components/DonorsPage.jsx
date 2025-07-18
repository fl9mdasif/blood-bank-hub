/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Search, Heart, Map, ChevronDown } from 'lucide-react';
import DonorCard from '../components/DonorCard';

const mockDonors = [
    { id: 1, name: 'Abdullah Al Mamun', bloodGroup: 'A+', location: 'Dhaka', available: true, image: 'https://i.pravatar.cc/150?u=1', joined: '2023-05-12', totalDonations: 5 },
    { id: 2, name: 'Fatima Akter', bloodGroup: 'B+', location: 'Chittagong', available: false, image: 'https://i.pravatar.cc/150?u=2', joined: '2022-11-20', totalDonations: 8 },
    { id: 3, name: 'Rahim Sheikh', bloodGroup: 'O+', location: 'Sylhet', available: true, image: 'https://i.pravatar.cc/150?u=3', joined: '2024-01-30', totalDonations: 2 },
    { id: 4, name: 'Sadia Islam', bloodGroup: 'AB+', location: 'Rajshahi', available: true, image: 'https://i.pravatar.cc/150?u=4', joined: '2023-08-15', totalDonations: 4 },
];
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
    const [searchTerm, setSearchTerm] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [location, setLocation] = useState('');

    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleBloodGroupChange = (e) => setBloodGroup(e.target.value);
    const handleLocationChange = (e) => setLocation(e.target.value);
    
    const filteredDonors = mockDonors.filter(donor => {
        return (
            donor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (bloodGroup ? donor.bloodGroup === bloodGroup : true) &&
            (location ? donor.location === location : true)
        );
    });

    return (
        <div className="bg-gray-50 min-h-screen">
            <section className="bg-white shadow-inner">
                <div className="container mx-auto px-6 py-8">
                    <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-2">Find a Blood Donor</h1>
                    <p className="text-center text-gray-600 mb-8">Search for heroes in your area willing to save a life.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-red-50/50 rounded-xl border border-red-100">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full rounded-full border-2 border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-700 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 transition-all"
                            />
                        </div>
                        <CustomSelect icon={Heart} options={bloodGroups} placeholder="Filter by Blood Group" onChange={handleBloodGroupChange} />
                        <CustomSelect icon={Map} options={divisions} placeholder="Filter by Division" onChange={handleLocationChange} />
                    </div>
                </div>
            </section>
            <section className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredDonors.map(donor => <DonorCard key={donor.id} donor={donor} />)}
                </div>
                {filteredDonors.length === 0 && (
                    <div className="text-center py-20">
                        <h3 className="text-2xl font-bold text-gray-700">No Donors Found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your filters or search term.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default DonorsPage;
