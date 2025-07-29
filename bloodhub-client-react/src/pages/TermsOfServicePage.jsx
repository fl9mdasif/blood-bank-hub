import React from 'react';

const TermsOfServicePage = () => {
    return (
        <div className="bg-gray-50 py-12 md:py-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Terms of Service</h1>
                    <p className="text-sm text-gray-500 mb-8">Last Updated: July 29, 2025</p>

                    <div className="prose max-w-none text-gray-700">
                        <p>
                            Welcome to BloodHub. These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our platform, you agree to be bound by these Terms.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">1. Eligibility</h2>
                        <p>
                            To register as a blood donor, you must be at least 18 years old and meet the health and eligibility requirements for blood donation as per local regulations in Bangladesh. You are responsible for ensuring you are medically fit to donate blood.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">2. User Responsibilities</h2>
                        <ul>
                            <li>You agree to provide accurate, current, and complete information during the registration process.</li>
                            <li>You are responsible for maintaining the confidentiality of your account password.</li>
                            <li>You agree not to use the platform for any unlawful or prohibited purpose.</li>
                        </ul>

                        <h2 className="text-2xl font-bold mt-8 mb-4">3. Disclaimer of Medical Advice</h2>
                        <p>
                            BloodHub is a platform to facilitate connections between donors and recipients. We are not a medical institution and do not provide medical advice. The decision to donate or receive blood is a medical one that should be made in consultation with qualified healthcare professionals.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">4. Limitation of Liability</h2>
                        <p>
                            BloodHub is not responsible for any health issues, disputes, or complications that may arise from any blood donation coordinated through our platform. We act solely as a facilitator. Users interact and proceed with donations at their own risk.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">5. Termination</h2>
                        <p>
                            We may terminate or suspend your account at our sole discretion, without prior notice, for conduct that we believe violates these Terms or is harmful to other users of the platform.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">6. Governing Law</h2>
                        <p>
                            These Terms shall be governed by and construed in accordance with the laws of Bangladesh.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">7. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at:
                            <br />
                            Email: <a href="mailto:support@bloodhub.com" className="text-red-600 hover:underline">support@bloodhub.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfServicePage;
