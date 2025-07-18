import React from 'react';
import Hero from './Hero'; // Assuming you have a Hero component
import DonorsPage from './DonorsPage';
import AboutPage from './AboutPage';

const HomePage = () => (
    <div>
        <Hero/>
        <DonorsPage/>
        <AboutPage/>
        {/* You can add more sections like "Recent Donors", "Success Stories" etc. here */}
    </div>
);

export default HomePage;