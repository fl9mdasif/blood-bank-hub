import React from 'react';
import { Users, Droplet, CheckCircle } from 'lucide-react';

// This is a placeholder component. In a real app, you would fetch this data.
const DashboardOverview = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-100 p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <Users className="h-8 w-8 text-blue-600" />
                        <div className="ml-4">
                            <p className="text-lg font-semibold text-blue-800">Total Users</p>
                            <p className="text-3xl font-bold text-blue-900">125</p>
                        </div>
                    </div>
                </div>
                <div className="bg-red-100 p-6 rounded-lg shadow">
                     <div className="flex items-center">
                        <Droplet className="h-8 w-8 text-red-600" />
                        <div className="ml-4">
                            <p className="text-lg font-semibold text-red-800">Total Donors</p>
                            <p className="text-3xl font-bold text-red-900">88</p>
                        </div>
                    </div>
                </div>
                <div className="bg-green-100 p-6 rounded-lg shadow">
                     <div className="flex items-center">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                        <div className="ml-4">
                            <p className="text-lg font-semibold text-green-800">Blood Requests</p>
                            <p className="text-3xl font-bold text-green-900">32</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
