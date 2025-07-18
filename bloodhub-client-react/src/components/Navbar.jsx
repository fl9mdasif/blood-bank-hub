import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';
import { Menu, X, Droplet, Heart, Users, Target, Phone, Mail, MapPin } from 'lucide-react';
// Utility function to conditionally join class names
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About Us' },
        { href: '/contact', label: 'Contact' },
        { href: '/donors', label: 'Donors' },
        { href: '/login', label: 'Login' },
        // { href: '/contact', label: 'Contact' },
    ];

    const linkClass = "text-gray-600 hover:text-red-600 transition-colors duration-300 font-medium";
    const activeLinkClass = "text-red-600";

    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-around">
                    {/* <Logo/> */}

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
                        <Link to="/register" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg">
                            Become a Donor
                        </Link>
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
                            <Link to="/register" onClick={() => setIsOpen(false)} className="w-full text-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-5 rounded-full transition-colors duration-300 mt-2 shadow-lg">
                                Become a Donor
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;