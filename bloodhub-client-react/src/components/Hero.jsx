import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => (
    <section className="bg-red-50">
        <div className="container mx-auto px-6 py-20 md:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight mb-4">
                        Donate Blood, <br /> <span className="text-red-600">Save a Life.</span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                        Your single act of kindness can be a ray of hope for someone in need. Join our community of heroes today and make a real impact.
                    </p>
                    <Link to="/register" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full text-lg transition-transform transform hover:scale-105 shadow-xl">
                        Get Started
                    </Link>
                </div>
                <div className="flex justify-center">
                    <div className="w-full max-w-md">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <path fill="#FECACA" d="M128.3,33.3c-24.8-24.8-65.1-24.8-89.9,0c-24.8,24.8-24.8,65.1,0,89.9L83.3,168l44.9-44.9 C153.1,98.4,153.1,58.1,128.3,33.3z"/>
                                <polyline fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="60,100 80,100 85,90 95,110 100,100 120,100" />
                                <path fill="#DBEAFE" d="M140,110 v40 a10 10 0 0 1 -10 10 h-30 a10 10 0 0 1 -10 -10 v-40 z" />
                                <rect x="95" y="100" width="40" height="10" fill="#BFDBFE" />
                                <line x1="115" y1="100" x2="115" y2="85" stroke="#93C5FD" strokeWidth="2" />
                                <line x1="83.3" y1="123.2" x2="115" y2="85" stroke="#93C5FD" strokeWidth="2" />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
export default HeroSection;