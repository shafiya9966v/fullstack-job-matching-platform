import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { Briefcase, CheckCircle, Clock, XCircle } from 'lucide-react';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.id) {
            fetchApplications();
        } else {
            setLoading(false);
        }
    }, [user]);

    const fetchApplications = async () => {
        try {
            const response = await api.get('/applications', { params: { userId: user.id } });
            setApplications(response.data);
        } catch (error) {
            console.error("Error fetching applications:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <div className="p-10 text-center">Please login to view dashboard.</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50/90 to-blue-50/90 py-10">
            <div className="container mx-auto px-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Application Dashboard</h1>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-gray-500 text-sm font-medium">Total Applied</p>
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <Briefcase className="w-5 h-5 text-blue-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-800">{applications.length}</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 hover:shadow-xl transition-shadow">
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-gray-500 text-sm font-medium">Pending Review</p>
                            <div className="bg-yellow-100 p-2 rounded-lg">
                                <Clock className="w-5 h-5 text-yellow-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-800">{applications.filter(a => a.status === 'Applied').length}</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500 hover:shadow-xl transition-shadow">
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-gray-500 text-sm font-medium">Interviews</p>
                            <div className="bg-green-100 p-2 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-800">{applications.filter(a => a.status === 'Interview').length}</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-shadow">
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-gray-500 text-sm font-medium">Rejected</p>
                            <div className="bg-red-100 p-2 rounded-lg">
                                <XCircle className="w-5 h-5 text-red-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-800">{applications.filter(a => a.status === 'Rejected').length}</p>
                    </div>
                </div>

                {/* Applications List */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                    <div className="px-6 py-4 border-b bg-gray-50/50">
                        <h2 className="text-lg font-bold text-gray-800">Recent Applications</h2>
                    </div>
                    {loading ? (
                        <div className="p-10 text-center text-gray-500">Loading applications...</div>
                    ) : applications.length === 0 ? (
                        <div className="p-10 text-center">
                            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Briefcase className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No applications yet</h3>
                            <p className="text-gray-500 mt-1 mb-6">Start searching for jobs and apply to see them here.</p>
                            <a href="/jobs" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Find Jobs</a>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Job Title</th>
                                        <th className="px-6 py-4 font-semibold">Company</th>
                                        <th className="px-6 py-4 font-semibold">Applied On</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {applications.map(app => (
                                        <tr key={app.id} className="hover:bg-blue-50/50 transition duration-150">
                                            <td className="px-6 py-4 font-medium text-gray-900">{app.jobTitle}</td>
                                            <td className="px-6 py-4 text-gray-600">{app.company}</td>
                                            <td className="px-6 py-4 text-gray-500">{new Date(app.date).toLocaleDateString()}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1
                                                    ${app.status === 'Applied' ? 'bg-yellow-100 text-yellow-800' :
                                                        app.status === 'Interview' ? 'bg-green-100 text-green-800' :
                                                            app.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full 
                                                        ${app.status === 'Applied' ? 'bg-yellow-500' :
                                                            app.status === 'Interview' ? 'bg-green-500' :
                                                                app.status === 'Rejected' ? 'bg-red-500' : 'bg-gray-500'}`}></span>
                                                    {app.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
