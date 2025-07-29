// import React from 'react';
// import { Link } from 'react-router-dom';

// const HeroSection = () => (
//     <section className="bg-red-50">
//         <div className="container mx-auto px-6 py-20 md:py-32">
//             <div className="grid lg:grid-cols-2 gap-12 items-center">
//                 <div className="text-center lg:text-left">
//                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight mb-4">
//                         Donate Blood, <br /> <span className="text-red-600">Save a Life.</span>
//                     </h1>
//                     <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
//                         Your single act of kindness can be a ray of hope for someone in need. Join our community of heroes today and make a real impact.
//                     </p>
//                     <Link to="/register" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full text-lg transition-transform transform hover:scale-105 shadow-xl">
//                         Get Started
//                     </Link>
//                 </div>
//                 <div className="flex justify-center">
//                     <div className="w-full max-w-md">
//                         <img src="https://globalhealing.org/wp-content/uploads/2023/12/imgpsh_fullsize1.png" alt="" />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>
// );
// export default HeroSection;



import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => (
    <section className="bg-red-50 overflow-hidden">
        <div className="container mx-auto px-6 py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column: Text Content */}
                <div className="text-center lg:text-left z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight mb-4 animate-fade-in-down">
                        Donate Blood, <br /> <span className="text-red-600">Save a Life.</span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up">
                        Your single act of kindness can be a ray of hope for someone in need. Join our community of heroes today and make a real impact.
                    </p>
                    <Link to="/register" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full text-lg transition-transform transform hover:scale-105 shadow-xl">
                        Get Started
                    </Link>
                </div>
                
                {/* Right Column: Image with Decorative Shape */}
                <div className="relative flex justify-center items-center">
                    {/* Decorative background shape */}
                    <div className="absolute w-4/5 h-4/5 bg-red-100 rounded-3xl transform -rotate-6 z-0"></div>
                    
                    {/* Responsive Image Container */}
                    <div className="relative w-full max-w-md lg:max-w-none z-10 p-4">
                        <img 
                            src="https://globalhealing.org/wp-content/uploads/2023/12/imgpsh_fullsize1.png" // Using a version with a transparent background
                            alt="Nurse attending to a blood donor" 
                            className="w-full h-full object-contain rounded-lg drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default HeroSection;
