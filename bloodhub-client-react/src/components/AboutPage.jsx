import { Heart, Target, Users } from "lucide-react";
import React from "react";

const AboutPage = () => (
    <div className="bg-gray-50">
        <section className="bg-red-600 text-white text-center py-20">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">আমাদের সম্পর্কে</h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto">ব্লাডহাব-এ আমরা জীবন বাঁচানোর লক্ষ্যে রক্তদাতা এবং গ্রহীতাদের সংযুক্ত করি।</p>
            </div>
        </section>
        <section className="container mx-auto px-6 py-20">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="relative">
                    <div className="absolute -top-4 -left-4 w-full h-full bg-blue-400 rounded-lg transform -rotate-3 z-0"></div>
                    <img src="https://spectrumam.com/wp-content/uploads/2020/04/Local-Blood-Donations-2.png" alt="Community of helpers" className="relative w-full rounded-lg shadow-2xl z-10" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">আমাদের পথচলা</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">ব্লাডহাব একটি অলাভজনক উদ্যোগ যা বাংলাদেশে রক্তদান সম্পর্কে সচেতনতা বৃদ্ধি এবং জরুরি রক্তের চাহিদা মেটাতে কাজ করে। আমাদের প্ল্যাটফর্মটি রক্তদাতাদের সহজেই নিবন্ধন করতে এবং যাদের রক্তের প্রয়োজন তাদের সাথে যোগাযোগ স্থাপন করতে সহায়তা করে।</p>
                    <p className="text-gray-600 leading-relaxed">আমরা বিশ্বাস করি, প্রতিটি রক্তদান একটি জীবন বাঁচানোর সমান। প্রযুক্তির সাহায্যে আমরা এই প্রক্রিয়াটিকে আরও সহজ, দ্রুত এবং কার্যকর করতে প্রতিশ্রুতিবদ্ধ।</p>
                </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center mt-24">
                <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                    <Target className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">আমাদের লক্ষ্য</h3>
                    <p className="text-gray-600">রক্তের প্রয়োজনে প্রত্যেক মানুষের পাশে দাঁড়ানো এবং একটি সুস্থ সমাজ গঠনে সহায়তা করা।</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                    <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">আমাদের দৃষ্টিভঙ্গি</h3>
                    <p className="text-gray-600">এমন একটি ভবিষ্যৎ তৈরি করা যেখানে রক্তের অভাবে কোনো জীবন বিপন্ন হবে না।</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                    <Users className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">আমাদের সম্প্রদায়</h3>
                    <p className="text-gray-600">স্বেচ্ছাসেবী রক্তদাতাদের একটি শক্তিশালী নেটওয়ার্ক তৈরি করা যারা সবসময় মানুষের পাশে দাঁড়াতে প্রস্তুত।</p>
                </div>
            </div>
        </section>
    </div>
);

export default AboutPage;