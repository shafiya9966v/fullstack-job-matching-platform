import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/jobs?query=${encodeURIComponent(searchTerm)}`);
        } else {
            navigate('/jobs');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 w-full">
            {/* Hero Section - layered structure so background image displays correctly */}
            <section className="relative h-[600px] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
                {/* Background image layer - fills section, behind everything */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/student_searching_job_ai_laptop.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                    aria-hidden="true"
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-blue-900/70" aria-hidden="true" />

                {/* Content on top */}
                <div className="container mx-auto px-6 relative z-10 text-center text-white">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-6xl font-bold mb-6"
                    >
                        Find Your Dream Job with <br /> <span className="text-yellow-300">AI Precision</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto"
                    >
                        Our AI matching engine connects you with jobs that perfectly fit your skills, experience, and career goals.
                    </motion.p>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="bg-white p-2 rounded-full shadow-2xl max-w-3xl mx-auto flex items-center"
                    >
                        <Search className="text-gray-400 ml-4 w-6 h-6" />
                        <input
                            type="text"
                            placeholder="Job title, skills, or company..."
                            className="flex-1 px-4 py-3 outline-none text-gray-700 bg-transparent text-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
                        >
                            Search Jobs
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Features Preview */}
            <div className="container mx-auto px-6 py-20">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose AIJobMatch?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: "AI Resume Parsing", desc: "Instantly extract skills and experience from your resume." },
                        { title: "Smart Matching", desc: "Get job recommendations with a % match score based on your profile." },
                        { title: "Career Insights", desc: "Analyze skill gaps and salary trends to plan your career." }
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-2 transition-transform duration-300">
                            <h3 className="text-xl font-bold mb-4 text-blue-600">{feature.title}</h3>
                            <p className="text-gray-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
