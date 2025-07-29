import React from 'react';
import { Menu, X, Droplet, Heart, Users, Target, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 border-t">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="flex flex-col">
                        {/* <Logo /> */}
                        <p className="text-sm mt-4 text-gray-400">Connecting blood donors with recipients to save precious lives across Bangladesh.</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-white text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="hover:text-red-500 transition-colors">About Us</Link></li>
                            <li><Link to="/donors" className="hover:text-red-500 transition-colors">Find Donors</Link></li>
                            <li><Link to="/admin" className="hover:text-red-500 transition-colors">Admin</Link></li>
                            <li><Link to="/contact" className="hover:text-red-500 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-bold text-white text-lg mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex items-center"><MapPin className="mr-3 text-red-500" size={20} /><span>Dhaka, Bangladesh</span></li>
                            <li className="flex items-center"><Mail className="mr-3 text-red-500" size={20} /><a href="mailto:asifalazad.fullstack@gmail.com" className="hover:text-red-500">asifalazad.fullstack@gmail.com</a></li>
                            <li className="flex items-center"><Phone className="mr-3 text-red-500" size={20} /><a href="tel:+880123456789" className="hover:text-red-500">+880 605 855875</a></li>
                        </ul>
                    </div>
                     {/* Legal */}
                    <div>
                        <h3 className="font-bold text-white text-lg mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link to="/privacy-policy" className="hover:text-red-500 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms-of-services" className="hover:text-red-500 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} BloodHub. All Rights Reserved. <a href="https://www.linkedin.com/in/fl9mdasif/">DEV_ASIF</a></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;