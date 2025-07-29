import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { User, Lock, Heart, LogOut, LayoutDashboard } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const DashboardPage = () => {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserRole(decodedToken.role);
            } catch (error) {
                console.error("Invalid token:", error);
                handleLogout(); // Log out if token is invalid
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    // Define links for different roles
    const userLinks = [
        { to: '/dashboard/profile', icon: User, label: 'My Profile' },
        { to: '/dashboard/my-requests', icon: Heart, label: 'My Requests' },
        { to: '/dashboard/requests-to-me', icon: Heart, label: 'Users Requests To Me' },
        { to: '/dashboard/change-password', icon: Lock, label: 'Change Password' },
    ];

    const adminLinks = [
        { to: '/dashboard/overview', icon: LayoutDashboard, label: 'Overview' },
        { to: '/dashboard/users', icon: User, label: 'User Management' },
        // { to: '/dashboard/requests-to-me', icon: Heart, label: 'Requests for Blood' },

    ];

    // Combine links based on role
    const sidebarLinks = userRole === 'admin' ? [...userLinks, ...adminLinks] : userLinks;

    const linkClass = "flex items-center px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors";
    const activeLinkClass = "bg-red-100 text-red-600 font-bold";

    if (userRole === null) {
        return <div>Loading dashboard...</div>; // Or a spinner component
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <aside className="md:col-span-3">
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <nav className="space-y-2">
                                {sidebarLinks.map(link => (
                                    <NavLink
                                        key={link.to}
                                        to={link.to}
                                        className={({ isActive }) => cn(linkClass, isActive && activeLinkClass)}
                                    >
                                        <link.icon className="h-5 w-5 mr-3" />
                                        <span>{link.label}</span>
                                    </NavLink>
                                ))}
                                <button
                                    onClick={handleLogout}
                                    className={`${linkClass} w-full`}
                                >
                                    <LogOut className="h-5 w-5 mr-3" />
                                    <span>Logout</span>
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="md:col-span-9">
                        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 min-h-[60vh]">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
