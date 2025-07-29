import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
// import Logo from './Logo';
import { Menu, X, LogOut } from 'lucide-react';

// Utility function to conditionally join class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // Hook to detect route changes

    // Check login status whenever the component mounts or the route changes
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, [location]); // Dependency array includes location to re-check on navigation

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setIsOpen(false); // Close mobile menu on logout
        navigate('/login');
    };

    const baseLinks = [
        { href: '/', label: 'Home' },
        { href: '/donors', label: 'Donors' },
        { href: '/about', label: 'About Us' },
        { href: '/contact', label: 'Contact' },
    ];

    const authLinks = isLoggedIn
        ? [{ href: '/dashboard', label: 'Dashboard' }]
        : [{ href: '/login', label: 'Login' }];

    const navLinks = [...baseLinks, ...authLinks];

    const linkClass = "text-gray-600 hover:text-red-600 transition-colors duration-300 font-medium";
    const activeLinkClass = "text-red-600";

    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* <Logo /> */}

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.href}
                                to={link.href}
                                className={({ isActive }) => cn(linkClass, isActive && activeLinkClass)}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="flex items-center text-gray-600 hover:text-red-600 transition-colors duration-300 font-medium">
                                <LogOut size={18} className="mr-2" /> Logout
                            </button>
                        ) : (
                            <Link to="/register" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg">
                                Become a Donor
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-red-600 focus:outline-none">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden mt-4 pb-4">
                        <div className="flex flex-col space-y-4 items-center">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.href}
                                    to={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) => cn('py-2 text-lg', linkClass, isActive && activeLinkClass)}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                            {isLoggedIn ? (
                                <button onClick={handleLogout} className="w-full text-center flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-5 rounded-full transition-colors duration-300 mt-2 shadow-lg">
                                    <LogOut size={20} className="mr-2" /> Logout
                                </button>
                            ) : (
                                <Link to="/register" onClick={() => setIsOpen(false)} className="w-full text-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-5 rounded-full transition-colors duration-300 mt-2 shadow-lg">
                                    Become a Donor
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
