import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, NavLink,  Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Registration from './components/Auth/Registration';
import Login from './components/Auth/Login';
import DonorsPage from './pages/DonorsPage';
import DonorDetailsPage from './pages/DonorDetailsPage';
import DashboardPage from './pages/DashboardPage';
import Profile from './components/dashboard/Profile';
import RequestsToMe from './components/dashboard/RequestsToMe';
import MyRequests from './components/dashboard/MyRequests';
import ChangePassword from './components/dashboard/ChangePassword';
import PrivateRoute from './components/PrivateRoute';

function App() {

    // const navigate = useNavigate();

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
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* Add other routes here */}
            <Route path="/donors" element={<DonorsPage />} />
            <Route path="/donors/:id" element={<DonorDetailsPage />} />

            {/* Private Routes - Corrected Structure */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<DashboardPage />}>
                {/* Redirect /dashboard to /dashboard/profile */}
                <Route index element={<Navigate to="profile" replace />} /> 
                <Route path="profile" element={<Profile />} />
                <Route path="my-requests" element={<MyRequests />} />
                <Route path="requests-to-me" element={<RequestsToMe/>} />
                <Route path="change-password" element={<ChangePassword />} />
              </Route>
            </Route>

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;