import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaQuoteLeft, FaSave, FaArrowLeft } from 'react-icons/fa';

// Color palette (matching login and profile pages)
const colors = {
  orange: "#FF7350",
  teal: "#125875",
};

const UpdateProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        bio: ''
    });
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
            setLoading(false);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        setError('');
        setSuccess('');
        
        try {
            const response = await axios.put(`http://localhost:8080/api/users/update/${user.id}`, user);
            setSuccess('Profile updated successfully!');
            // Update localStorage
            localStorage.setItem('user', JSON.stringify(response.data));
            
            // Redirect after a short delay
            setTimeout(() => {
                navigate('/profile');
            }, 1500);
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile. Please try again.');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-indigo-50">
            <div className="p-8 text-center">
                <div className="w-16 h-16 border-4 border-t-4 rounded-full mx-auto mb-4"
                    style={{ 
                        borderColor: `${colors.teal} transparent transparent transparent`,
                        animation: 'spin 1s linear infinite'
                    }}>
                </div>
                <p className="text-gray-600">Loading your profile...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-indigo-50 p-4">
            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                    <div style={{ 
                      background: `linear-gradient(to right, ${colors.teal}, ${colors.orange})`,
                      padding: '1.5rem'
                    }} className="text-center">
                        <h1 className="text-2xl font-bold text-white">Edit Your Profile</h1>
                        <p className="text-white text-opacity-80 mt-1">Update your BrainBoost information</p>
                    </div>
                    
                    <div className="p-6">
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                                <p className="font-medium flex items-center">
                                    <span className="mr-2">⚠️</span>
                                    {error}
                                </p>
                            </div>
                        )}
                        
                        {success && (
                            <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
                                <p className="font-medium flex items-center">
                                    <span className="mr-2">✓</span>
                                    {success}
                                </p>
                            </div>
                        )}
                        
                        <form onSubmit={handleUpdate}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaUser className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={user.name}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                                        style={{ 
                                          boxShadow: `0 0 0 ${user.name ? '2px' : '0'} ${colors.teal}`,
                                          borderColor: user.name ? colors.teal : 'rgb(209, 213, 219)'
                                        }}
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                                        style={{ 
                                          boxShadow: `0 0 0 ${user.email ? '2px' : '0'} ${colors.teal}`,
                                          borderColor: user.email ? colors.teal : 'rgb(209, 213, 219)'
                                        }}
                                        placeholder="Enter your email address"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-medium mb-2">Bio</label>
                                <div className="relative">
                                    <div className="absolute top-3 left-3 pointer-events-none">
                                        <FaQuoteLeft className="text-gray-400" />
                                    </div>
                                    <textarea
                                        name="bio"
                                        value={user.bio}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all min-h-24"
                                        style={{ 
                                          boxShadow: `0 0 0 ${user.bio ? '2px' : '0'} ${colors.teal}`,
                                          borderColor: user.bio ? colors.teal : 'rgb(209, 213, 219)'
                                        }}
                                        placeholder="Tell us about yourself"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex space-x-3 mb-4">
                                <button
                                    type="submit"
                                    disabled={updating}
                                    style={{ 
                                      backgroundColor: colors.orange,
                                      borderColor: 'transparent',
                                      opacity: updating ? 0.7 : 1
                                    }}
                                    className="flex-1 flex justify-center items-center py-3 px-4 border rounded-lg shadow-sm text-white hover:opacity-90 transition-all"
                                >
                                    {updating ? "Updating..." : <><FaSave className="mr-2" /> Save Changes</>}
                                </button>
                                
                                <button
                                    type="button"
                                    onClick={() => navigate('/profile')}
                                    className="flex-1 flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 transition-all"
                                >
                                    <FaArrowLeft className="mr-2" /> Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                
                <div className="text-center mt-4 text-gray-500 text-sm">
                    <p>BrainBoost &copy; {new Date().getFullYear()}</p>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;