import React from 'react';
import Hero from './Hero'; // Assuming you have a Hero component
import DonorsPage from '../pages/DonorsPage'; // Importing the DonorsPage component
import AboutPage from './AboutPage';
import { Outlet } from 'react-router-dom';

const HomePage = () => (
    <div>
        <Outlet />
        <Hero/>
        <DonorsPage/>
        <AboutPage/>
        {/* You can add more sections like "Recent Donors", "Success Stories" etc. here */}
    </div>
);

export default HomePage;