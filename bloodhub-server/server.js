require('dotenv').config(); // To manage environment variables from a .env file
 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import the main router which combines all other route files
const mainRouter = require('./src/routes'); 
 
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.DATABASE_URL

// console.log("JWT Secret Loaded on Server:", process.env.JWT_ACCESS_SECRET); // Add this line

app.use(cors()); 

// Enable the Express app to parse JSON formatted request bodies
app.use(express.json()); 
 
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB.');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        // Exit the process with failure code if database connection fails
        process.exit(1); 
    });
 
app.use('/api', mainRouter);


// --- Basic Welcome Route ---
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Blood Donation API!',
        documentation: 'Please refer to the API documentation for available endpoints.'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running and listening on http://localhost:${PORT}`);
});
