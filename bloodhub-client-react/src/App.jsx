import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DonorsPage from './components/DonorsPage';
import DonorDetailsPage from './components/DonorDetailsPage';
import Registration from './components/Auth/Registration';
import Login from './components/Auth/Login';

function App() {
  return (
    <Router> 
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar/>
        <main className="flex-grow">
          <Routes>
            <Route path="/register" element={<Registration/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<HomePage/>} />
            <Route path="/about" element={<AboutPage/>} />
            <Route path="/contact" element={<Contact />} />
            {/* Add other routes here */}
            <Route path="/donors" element={<DonorsPage />} />
            <Route path="/donors/:id" element={<DonorDetailsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;