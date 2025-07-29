/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/admin/getall');
                setUsers(response.data);
            } catch (err) {
                setError('Failed to fetch users.');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleStatusChange = async (userId, newStatus) => {
        try {
            await api.put(`/admin/user/${userId}`, { accountStatus: newStatus });
            setUsers(users.map(user => user._id === userId ? { ...user, accountStatus: newStatus } : user));
        } catch (err) {
            alert('Failed to update user status.');
        }
    };

    if (loading) return <div className="text-center">Loading users...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full text-sm divide-y-2 divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Username</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Email</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Role</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Status</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map(user => (
                            <tr key={user._id}>
                                <td className="px-4 py-3">{user.username}</td>
                                <td className="px-4 py-3">{user.email}</td>
                                <td className="px-4 py-3 capitalize">{user.role}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.accountStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {user.accountStatus}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    {user.accountStatus === 'active' ? (
                                        <button onClick={() => handleStatusChange(user._id, 'deactivated')} className="text-red-600 hover:text-red-800">Deactivate</button>
                                    ) : (
                                        <button onClick={() => handleStatusChange(user._id, 'active')} className="text-green-600 hover:text-green-800">Activate</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
