import React, { useState, useContext } from 'react';
import { MapPin, DollarSign, Clock, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [applied, setApplied] = useState(false);

    const handleApply = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        // Logic: Check if resume is saved
        if (!user.profile || !user.profile.resumeFile) {
            alert("Please upload and save your resume in the Profile section before applying.");
            navigate('/profile');
            return;
        }

        setLoading(true);
        try {
            await api.post('/applications', { userId: user.id, jobId: job.id });
            setApplied(true);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message); // e.g. "Already applied"
                if (error.response.data.message.includes('Already applied')) {
                    setApplied(true);
                }
            } else {
                console.error("Apply failed", error);
                alert("Failed to apply");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                    <p className="text-blue-600 font-medium">{job.company}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">
                        {job.type}
                    </span>
                    {job.matchScore !== undefined && (
                        <span className={`text-xs font-bold px-2 py-1 rounded ${job.matchScore > 70 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {job.matchScore}% Match
                        </span>
                    )}
                </div>
            </div>

            <div className="space-y-2 mb-6">
                <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    {job.location}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                    <DollarSign className="w-4 h-4 mr-2" />
                    {job.salary}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                    <Briefcase className="w-4 h-4 mr-2" />
                    {job.experience}
                </div>
                <div className="flex items-center text-gray-500 text-xs mt-2">
                    <Clock className="w-3 h-3 mr-1" />
                    Posted {new Date(job.postedDate).toLocaleDateString()}
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                {job.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                        {skill}
                    </span>
                ))}
            </div>

            <button
                onClick={handleApply}
                disabled={applied || loading}
                className={`w-full py-2 rounded-lg font-semibold transition ${applied
                    ? 'bg-green-600 text-white cursor-default'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
            >
                {loading ? 'Applying...' : applied ? 'Applied Successfully' : 'Apply Now'}
            </button>
        </motion.div>
    );
};

export default JobCard;
