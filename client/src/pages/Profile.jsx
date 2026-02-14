import axios from 'axios'; // Import axios directly
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { Upload, FileText, CheckCircle, User, Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [parsedData, setParsedData] = useState(null);
    const [profileData, setProfileData] = useState({
        skills: '',
        experience: '',
        education: '',
        bio: ''
    });

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('resume', file);

        setUploading(true);
        try {
            // Fix: Use direct axios call to avoid default Content-Type: application/json from api instance
            // This ensures the browser sets the correct multipart/form-data header with boundary
            const response = await axios.post('http://localhost:5000/api/resume/upload', formData);

            setParsedData(response.data.data);
            // Auto-fill form
            setProfileData(prev => ({
                ...prev,
                skills: response.data.data.skills.join(', '),
                experience: response.data.data.experience || 'Parsed from resume...'
            }));
        } catch (error) {
            console.error("Upload failed details:", error);
            if (error.response) {
                console.error("Server Response:", error.response.data);
                console.error("Status:", error.response.status);
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Error setting up request:", error.message);
            }

            const msg = error.response?.data?.message || "Failed to upload resume. Please check console for details.";
            alert(msg);
        } finally {
            setUploading(false);
        }
    };

    const handleSaveResume = async () => {
        if (!parsedData) return;
        try {
            const response = await api.post('/resume/save', {
                userId: user.id, // Assuming user object has id
                resumeData: parsedData,
                profileData: profileData
            });

            // Update context with new user data (containing resume info)
            if (response.data.user) {
                updateUser(response.data.user);
            }

            alert("Resume saved to profile successfully!");
        } catch (error) {
            console.error("Save failed", error);
            alert("Failed to save resume.");
        }
    };

    const handleFindJobs = () => {
        if (parsedData && parsedData.skills) {
            // Create a query string from the first few skills to avoid URL length issues
            const skillsQuery = parsedData.skills.slice(0, 3).join(' ');
            window.location.href = `/jobs?query=${encodeURIComponent(skillsQuery)}`;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/90 py-10">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">My Smart Profile</h1>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Sidebar / User Card */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-600 h-fit">
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
                                <User className="w-12 h-12 text-blue-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">{user?.name || 'Guest User'}</h2>
                            <p className="text-blue-600 font-medium">{user?.role || 'Candidate'}</p>
                            <div className="mt-6 w-full">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-500 font-medium">Profile Strength</span>
                                    <span className="text-blue-600 font-bold">45%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Resume Upload Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-8 rounded-xl shadow-lg border border-blue-50"
                        >
                            <h3 className="text-xl font-bold mb-4 flex items-center text-gray-800">
                                <FileText className="mr-2 text-blue-600" /> AI Resume Analyzer
                            </h3>
                            <p className="text-gray-600 mb-6">Upload your resume. Our AI will extract your skills and instantly match you with relevant jobs.</p>

                            <div className="border-2 border-dashed border-blue-200 bg-blue-50/30 rounded-lg p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group">
                                <input
                                    type="file"
                                    id="resume-upload"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept=".pdf"
                                />
                                <label htmlFor="resume-upload" className="cursor-pointer block">
                                    <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                        <Upload className="w-8 h-8 text-blue-500" />
                                    </div>
                                    <p className="text-lg font-medium text-gray-800">
                                        {file ? file.name : "Click to upload resume"}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-2">Supports PDF only (Max 10MB)</p>
                                </label>
                            </div>

                            <div className="flex gap-4 mt-6 flex-wrap">
                                <button
                                    onClick={handleUpload}
                                    disabled={!file || uploading}
                                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform active:scale-[0.98]"
                                >
                                    {uploading ? "Analyzing..." : "Analyze Resume"}
                                </button>

                                {parsedData && (
                                    <>
                                        <button
                                            onClick={handleSaveResume}
                                            className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition shadow-md hover:shadow-lg transform active:scale-[0.98] flex items-center justify-center gap-2"
                                        >
                                            <FileText className="w-5 h-5" /> Save Resume
                                        </button>
                                        <button
                                            onClick={handleFindJobs}
                                            className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow-md hover:shadow-lg transform active:scale-[0.98] flex items-center justify-center gap-2"
                                        >
                                            <Briefcase className="w-5 h-5" /> Find Jobs
                                        </button>
                                    </>
                                )}
                            </div>

                            {parsedData && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-6 p-4 bg-green-50 text-green-800 rounded-lg flex items-start border border-green-200"
                                >
                                    <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold">Analysis Complete!</p>
                                        <p className="text-sm mt-1">We found <span className="font-bold">{parsedData.skills.length} skills</span>. Your profile has been auto-filled.</p>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Profile Form */}
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-bold mb-6 text-gray-800">Professional Details</h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 flex items-center">
                                        <div className="bg-purple-100 p-1.5 rounded mr-2">
                                            <Briefcase className="w-4 h-4 text-purple-600" />
                                        </div>
                                        Key Skills
                                    </label>
                                    <textarea
                                        value={profileData.skills}
                                        onChange={(e) => setProfileData({ ...profileData, skills: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
                                        rows="3"
                                        placeholder="E.g. React, Node.js, Project Management..."
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 flex items-center">
                                        <div className="bg-orange-100 p-1.5 rounded mr-2">
                                            <GraduationCap className="w-4 h-4 text-orange-600" />
                                        </div>
                                        Experience & Education
                                    </label>
                                    <textarea
                                        value={profileData.experience}
                                        onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
                                        rows="4"
                                        placeholder="Tell us about your work history and qualifications..."
                                    ></textarea>
                                </div>
                                <button className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-black transition font-semibold shadow-lg">
                                    Save Profile Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
