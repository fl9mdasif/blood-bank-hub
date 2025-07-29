// /* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const MyRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await api.get('/requests/my-requests');
                setRequests(response.data);
            } catch (err) {
                console.log('checkerr',err);
                setError('Failed to fetch your blood requests.');
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    const StatusBadge = ({ status }) => {
        const baseClasses = "px-3 py-1 text-xs font-bold text-white rounded-full";
        const statusClasses = {
            pending: "bg-yellow-500",
            approved: "bg-green-500",
            rejected: "bg-red-500",
        };
        return <span className={cn(baseClasses, statusClasses[status])}>{status}</span>;
    };

    if (loading) return <div className="text-center">Loading your requests...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Blood Requests</h1>
            {requests.length === 0 ? (
                <p className="text-gray-500">You have not made any blood requests yet.</p>
            ) : (
                <div className="space-y-4">
                    {requests.map(req => (
                        <div key={req._id} className="bg-gray-50 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div>
                                <p className="font-bold text-lg text-gray-800">To: {req.donor.username}</p>
                                <p className="text-sm text-gray-500">Blood Group: <span className="font-semibold text-red-600">{req.donor.bloodType}</span></p>
                                <p className="text-sm text-gray-500">Location: {req.donor.location}</p>
                            </div>
                            <div className="mt-3 md:mt-0">
                                <StatusBadge status={req.status} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyRequests;
