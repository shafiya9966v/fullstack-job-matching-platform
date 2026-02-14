import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import JobCard from '../components/JobCard';
import { Search, Filter } from 'lucide-react';

const Jobs = () => {
    const { user } = useContext(AuthContext); // Get user from context
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        location: '',
        experience: '',
    });

    useEffect(() => {
        fetchJobs();
    }, [filters, user]); // Re-fetch if filters or user changes

    const fetchJobs = async () => {
        setLoading(true);
        try {
            // Construct query params
            const params = {};
            if (searchTerm) params.query = searchTerm;
            if (filters.location) params.location = filters.location;
            if (filters.experience) params.experience = filters.experience;
            if (user?.id) params.userId = user.id; // Pass userId for matching

            const response = await api.get('/jobs', { params });
            setJobs(response.data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/90 py-10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-gray-800">Find Your Next Job</h1>

                    {/* Search & Filter Bar */}
                    {/* Search & Filter Bar */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="flex-1 flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by title, skill, or company..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && fetchJobs()}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                onClick={fetchJobs}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Search
                            </button>
                        </div>
                        <select
                            className="border rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={filters.location}
                            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                        >
                            <option value="">All Locations</option>
                            <option value="Remote">Remote</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Delhi">Delhi-NCR</option>
                            <option value="Pune">Pune</option>
                            <option value="Chennai">Chennai</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20">Loading jobs...</div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.length > 0 ? (
                            jobs.map(job => (
                                <JobCard key={job.id} job={job} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 text-gray-500">
                                No jobs found matching your criteria.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Jobs;
