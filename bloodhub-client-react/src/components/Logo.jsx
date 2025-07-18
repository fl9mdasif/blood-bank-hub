import React from 'react';

const Logo = () => (
    <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-red-600">
        <Droplet className="h-7 w-7" />
        <span>BloodHub</span>
    </Link>
);

export default Logo;