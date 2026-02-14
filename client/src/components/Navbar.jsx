import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, User, LogIn, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-600">
                    <Briefcase className="w-8 h-8" />
                    <span>AIJobMatch</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-4 items-center">
                    {user && (
                        <>
                            <Link to="/jobs" className="bg-gray-100 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg transition font-medium border border-blue-200 shadow-sm flex items-center gap-2">
                                <Briefcase className="w-4 h-4" /> Find Jobs
                            </Link>
                            <Link to="/dashboard" className="bg-gray-100 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg transition font-medium border border-blue-200 shadow-sm flex items-center gap-2">
                                <LogIn className="w-4 h-4 rotate-0" /> Dashboard
                            </Link>
                            <Link to="/profile" className="bg-gray-100 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg transition font-medium border border-blue-200 shadow-sm flex items-center gap-2">
                                <User className="w-4 h-4" /> Profile
                            </Link>
                        </>
                    )}
                </div>

                {/* Auth Buttons */}
                <div className="flex space-x-4 items-center">
                    {user ? (
                        <div className="flex items-center space-x-4 bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg shadow-sm">
                            <span className="text-gray-700 font-medium hidden sm:block">Welcome, <span className="text-blue-600">{user.name}</span></span>
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-1 bg-red-50 text-red-500 hover:bg-red-100 px-3 py-1.5 rounded-md transition border border-red-100"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline font-medium">Logout</span>
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition flex items-center space-x-1">
                                <LogIn className="w-4 h-4" />
                                <span>Login</span>
                            </Link>
                            <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
