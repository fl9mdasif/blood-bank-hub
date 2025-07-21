import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Users, LayoutDashboard, LogOut } from 'lucide-react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const AdminDashboardPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const sidebarLinks = [
        { to: '/admin/overview', icon: LayoutDashboard, label: 'Overview' },
        { to: '/admin/users', icon: Users, label: 'User Management' },
    ];

    const linkClass = "flex items-center px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors";
    const activeLinkClass = "bg-red-100 text-red-600 font-bold";

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

export default AdminDashboardPage;
