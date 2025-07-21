import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Heart, Calendar } from 'lucide-react';

// Mock Data - In a real application, this would come from your API
const mockDonors = [
    { id: 1, name: 'Abdullah Al Mamun', bloodGroup: 'A+', location: 'Dhaka', available: true, image: 'https://i.pravatar.cc/150?u=1', joined: '2023-05-12', totalDonations: 5 },
    { id: 2, name: 'Fatima Akter', bloodGroup: 'B+', location: 'Chittagong', available: false, image: 'https://i.pravatar.cc/150?u=2', joined: '2022-11-20', totalDonations: 8 },
    { id: 3, name: 'Rahim Sheikh', bloodGroup: 'O+', location: 'Sylhet', available: true, image: 'https://i.pravatar.cc/150?u=3', joined: '2024-01-30', totalDonations: 2 },
    { id: 4, name: 'Sadia Islam', bloodGroup: 'AB+', location: 'Rajshahi', available: true, image: 'https://i.pravatar.cc/150?u=4', joined: '2023-08-15', totalDonations: 4 },
    { id: 5, name: 'Kamal Hossain', bloodGroup: 'A-', location: 'Khulna', available: true, image: 'https://i.pravatar.cc/150?u=5', joined: '2021-03-25', totalDonations: 12 },
    { id: 6, name: 'Nusrat Jahan', bloodGroup: 'O-', location: 'Barisal', available: true, image: 'https://i.pravatar.cc/150?u=6', joined: '2024-02-10', totalDonations: 1 },
    { id: 7, name: 'Imran Khan', bloodGroup: 'B-', location: 'Rangpur', available: false, image: 'https://i.pravatar.cc/150?u=7', joined: '2022-09-01', totalDonations: 7 },
    { id: 8, name: 'Ayesha Siddika', bloodGroup: 'AB-', location: 'Mymensingh', available: true, image: 'https://i.pravatar.cc/150?u=8', joined: '2023-12-05', totalDonations: 3 },
];

// Helper for conditional class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

const DonorDetailsPage = () => {
    // Get the donor ID from the URL
    const { id } = useParams();
    
    // Find the specific donor from our mock data
    // In a real app, you would use the ID to fetch data from your API:
    // useEffect(() => { fetchDonor(id) }, [id]);
    const donor = mockDonors.find(d => d.id === parseInt(id));

    // Handle case where donor is not found
    if (!donor) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold text-gray-700">Donor Not Found</h1>
                <p className="text-gray-500 mt-2">The donor you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 py-12 md:py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header Section with Profile Image */}
                    <div className="h-48 bg-red-100 flex items-center justify-center relative">
                         <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10" style={{backgroundImage: 'url(https://www.toptal.com/designers/subtlepatterns/uploads/watercolor.png)'}}></div>
                        <img src={donor.image} alt={donor.name} className="w-32 h-32 rounded-full border-8 border-white shadow-xl z-10" />
                    </div>

                    {/* Name and Availability Section */}
                    <div className="text-center p-6 -mt-16 bg-white relative pt-20">
                        <h1 className="text-4xl font-extrabold text-gray-800">{donor.name}</h1>
                        <p className="text-lg text-red-600 font-bold mt-1">Blood Group: {donor.bloodGroup}</p>
                        <div className={cn("mt-4 inline-block px-4 py-1.5 text-sm font-semibold text-white rounded-full", donor.available ? "bg-green-500" : "bg-yellow-500")}>
                            {donor.available ? "Available for Donation" : "Currently Unavailable"}
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="border-t border-gray-200 p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="flex flex-col items-center">
                            <MapPin className="h-8 w-8 text-red-500 mb-2" />
                            <span className="text-sm text-gray-500">Location</span>
                            <span className="text-lg font-semibold text-gray-800">{donor.location}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <Heart className="h-8 w-8 text-red-500 mb-2" />
                            <span className="text-sm text-gray-500">Total Donations</span>
                            <span className="text-lg font-semibold text-gray-800">{donor.totalDonations}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <Calendar className="h-8 w-8 text-red-500 mb-2" />
                            <span className="text-sm text-gray-500">Joined On</span>
                            <span className="text-lg font-semibold text-gray-800">{new Date(donor.joined).toLocaleDateString()}</span>
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
