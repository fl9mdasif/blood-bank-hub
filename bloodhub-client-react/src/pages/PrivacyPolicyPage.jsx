import React from 'react';

const PrivacyPolicyPage = () => {
    return (
        <div className="bg-gray-50 py-12 md:py-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Privacy Policy</h1>
                    <p className="text-sm text-gray-500 mb-8">Last Updated: July 29, 2025</p>

                    <div className="prose max-w-none text-gray-700">
                        <p>
                            BloodHub ("we," "us," or "our") is committed to protecting the privacy of our users. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform to connect blood donors with recipients.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
                        <p>We may collect the following types of information:</p>
                        <ul>
                            <li><strong>Personal Data:</strong> Name, email address, phone number, division, district, thana, and profile photo.</li>
                            <li><strong>Health Information (for Donors):</strong> Blood type and availability status. This sensitive information is collected only with your explicit consent to facilitate the donation process.</li>
                            <li><strong>Usage Data:</strong> Information on how you access and use the platform, collected automatically.</li>
                        </ul>

                        <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
                        <p>We use the information we collect to:</p>
                        <ul>
                            <li>Create and manage your account.</li>
                            <li>Facilitate the connection between blood donors and individuals in need.</li>
                            <li>Communicate with you about blood requests and platform updates.</li>
                            <li>Improve the functionality and security of our platform.</li>
                            <li>Comply with legal obligations.</li>
                        </ul>

                        <h2 className="text-2xl font-bold mt-8 mb-4">3. Information Sharing</h2>
                        <p>
                            Your privacy is paramount. We only share your information in the following circumstances:
                        </p>
                        <ul>
                            <li><strong>With Recipients:</strong> If you are a donor and approve a blood request, we will share your contact information with the requester so they can coordinate the donation.</li>
                            <li><strong>For Legal Reasons:</strong> We may disclose your information if required by law or in response to valid requests by public authorities.</li>
                        </ul>
                        <p>We will never sell your personal data to third parties.</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Security</h2>
                        <p>
                            We implement administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that no security measures are perfect or impenetrable.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">5. Your Rights</h2>
                        <p>
                            You have the right to access, update, or delete your personal information at any time through your user dashboard. If you wish to deactivate your account, please contact us.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">6. Contact Us</h2>
                        <p>
                            If you have questions or comments about this Privacy Policy, please contact us at:
                            <br />
                            Email: <a href="mailto:privacy@bloodhub.com" className="text-red-600 hover:underline">privacy@bloodhub.com</a>
                            <br />
                            Address: 123 Health St, Medical City, Dhaka, Bangladesh
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
