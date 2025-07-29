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
import PrivateRoute from './components/PrivateRoute';
import DashboardOverview from './components/dashboard/admin/DashboardOverview';
import UserManagement from './components/dashboard/admin/UserManagement';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import DashboardPage from './components/dashboard/DashboardPage';        
import RequestsToMe from './components/dashboard/user/RequestsToMe';        
import MyRequests from './components/dashboard/user/MyRequests';        
import ChangePassword from './components/dashboard/user/ChangePassword';      
import Profile from './components/dashboard/user/Profile';
import BloodRequestModal from './components/dashboard/BloodRequestModal';


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
            <Route path="/privacy-policy" element={<PrivacyPolicyPage/>} />
            <Route path="/terms-of-services" element={<TermsOfServicePage/>} />
            
            {/* Add other routes here */}
            <Route path="/donors" element={<DonorsPage />} />

            <Route element={<PrivateRoute />}>
            <Route path="/donors/:id" element={<DonorDetailsPage />} />
            <Route path="/request-for-blood" element={<BloodRequestModal />} />
            </Route>

            {/* Private User & Admin Routes are now merged under a single protected route */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<DashboardPage />}>
                {/* Default route for the dashboard */}
                <Route index element={<Navigate to="profile" replace />} /> 
                
                {/* User-specific routes */}
                <Route path="profile" element={<Profile />} />
                <Route path="my-requests" element={<MyRequests />} />
                <Route path="requests-to-me" element={<RequestsToMe />} />
                <Route path="change-password" element={<ChangePassword />} />
                
                {/* Admin-specific routes */}
                <Route path="overview" element={<DashboardOverview />} />
                <Route path="users" element={<UserManagement />} />
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