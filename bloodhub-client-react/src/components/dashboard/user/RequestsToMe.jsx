/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';

const RequestsToMe = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchRequests = async () => {
        try {
            const response = await api.get('/requests/to-me');
            setRequests(response.data);
    
        } catch (err) {
            setError('Failed to fetch blood requests.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleUpdateStatus = async (id, status) => {
        try {
            await api.put(`/requests/${id}`, { status });
            // Refetch requests to show the updated status
            fetchRequests();
        } catch (err) {
            alert('Failed to update request status.');
        }
    };

    if (loading) return <div className="text-center">Loading incoming requests...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Requests for Blood</h1>
            {requests.length === 0 ? (
                <p className="text-gray-500">You have not received any blood requests.</p>
            ) : (
                <div className="space-y-4">
                    {requests.map(req => (
                        <div key={req._id} className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                <div>
                                    <p className="font-bold text-lg text-gray-800">From: {req.requester.username}</p>
                                    <p className="text-sm text-gray-500">Email: {req.requester.email}</p>
                                    <p className="text-sm text-gray-500 mt-1">Status: <span className="font-semibold capitalize">{req.status}</span></p>
                                </div>
                                {req.status === 'pending' && (
                                    <div className="flex space-x-2 mt-4 md:mt-0">
                                        <button
                                            onClick={() => handleUpdateStatus(req._id, 'approved')}
                                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleUpdateStatus(req._id, 'rejected')}
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RequestsToMe;
