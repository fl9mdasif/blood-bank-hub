import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const ContactPage = () => (
    <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Get In Touch</h1>
                <p className="text-lg text-gray-600 mt-4">We'd love to hear from you. Please fill out the form below.</p>
            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden md:flex">
                <div className="md:w-1/2 p-8 md:p-12">
                    <form>
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                            <input type="text" id="name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                            <input type="email" id="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                            <textarea id="message" rows="5" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-5 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl">
                            Send Message
                        </button>
                    </form>
                </div>
                <div className="md:w-1/2 bg-red-50 p-8 md:p-12 flex flex-col justify-center">
                     <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
                     <ul className="space-y-6 text-gray-700">
                        <li className="flex items-start"><MapPin className="mr-4 text-red-600 mt-1 flex-shrink-0" size={24} /><span>123 Health St, Medical City, <br/>Dhaka, Bangladesh</span></li>
                        <li className="flex items-start"><Mail className="mr-4 text-red-600 mt-1 flex-shrink-0" size={24} /><a href="mailto:contact@bloodhub.com" className="hover:text-red-600">contact@bloodhub.com</a></li>
                        <li className="flex items-start"><Phone className="mr-4 text-red-600 mt-1 flex-shrink-0" size={24} /><a href="tel:+880987654321" className="hover:text-red-600">+880 987 654321</a></li>
                     </ul>
                </div>
            </div>
        </div>
    </div>
);

export default ContactPage;