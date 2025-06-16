import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaUsers, FaEdit, FaTrash, FaSignOutAlt, FaUpload, FaUserFriends } from 'react-icons/fa';

// Color palette (matching login page)
const colors = {
  orange: "#FF7350",
  teal: "#125875",
};

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [followerCount, setFollowerCount] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);

            axios.get(`http://localhost:8080/api/users/${parsedUser.id}/followers/count`)
                .then(response => {
                    setFollowerCount(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching follower count:', error);
                    setError('Failed to load follower count');
                    setLoading(false);
                });

        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select an image file first.');
            return;
        }

        setUploadLoading(true);
        setError('');
        setUploadSuccess('');
        
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.put(
                `http://localhost:8080/api/users/upload-profile-image/${user.id}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            setUploadSuccess('Profile image updated successfully!');

            const updatedUser = { ...user, profileImageUrl: URL.createObjectURL(selectedFile) };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));

        } catch (error) {
            console.error('Error uploading image:', error);
            setError('Failed to upload image');
        } finally {
            setUploadLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
            try {
                await axios.delete(`http://localhost:8080/api/users/delete/${user.id}`);
                setUploadSuccess('Profile deleted successfully');
                localStorage.removeItem('user');
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } catch (error) {
                console.error('Error deleting profile:', error);
                setError('Failed to delete profile');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
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
                        <h1 className="text-2xl font-bold text-white">Your BrainBoost Profile</h1>
                        <p className="text-white text-opacity-80 mt-1">Manage your account information</p>
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
                        
                        {uploadSuccess && (
                            <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
                                <p className="font-medium flex items-center">
                                    <span className="mr-2">✓</span>
                                    {uploadSuccess}
                                </p>
                            </div>
                        )}
                        
                        <div className="flex flex-col items-center mb-6">
                            <div className="relative mb-3">
                                <img
                                    src={user.profileImageUrl || '/default-profile.png'}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                                />
                                <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                                    <label htmlFor="profile-upload" className="cursor-pointer">
                                        <FaEdit className="text-gray-500 hover:text-gray-700" />
                                    </label>
                                    <input 
                                        id="profile-upload" 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleFileChange} 
                                        className="hidden" 
                                    />
                                </div>
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                            <div className="flex items-center mt-1 text-gray-500">
                                <FaEnvelope className="mr-1" /> {user.email}
                            </div>
                        </div>
                        
                        {selectedFile && (
                            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded flex justify-between items-center">
                                <div className="text-sm truncate">
                                    <span className="font-medium">Selected: </span>
                                    {selectedFile.name}
                                </div>
                                <button
                                    onClick={handleUpload}
                                    disabled={uploadLoading}
                                    style={{ backgroundColor: colors.orange }}
                                    className="text-white py-1 px-3 rounded text-sm flex items-center"
                                >
                                    {uploadLoading ? (
                                        <span>Uploading...</span>
                                    ) : (
                                        <>
                                            <FaUpload className="mr-1" /> Upload
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                        
                        <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                            <div className="flex items-center mb-2">
                                <FaUser className="text-gray-500 mr-2" />
                                <h3 className="font-medium text-gray-700">Bio</h3>
                            </div>
                            <p className="text-gray-600 pl-6">{user.bio || "No bio added yet."}</p>
                        </div>
                        
                        <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center">
                                <FaUsers className="text-gray-500 mr-2" />
                                <span className="text-gray-700">Followers</span>
                            </div>
                            <span className="bg-white py-1 px-3 rounded-full text-sm font-medium shadow-sm border border-gray-200" style={{ color: colors.teal }}>
                                {followerCount}
                            </span>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-3 mt-6">
                            <button
                                onClick={() => navigate('/edit-profile')}
                                style={{ backgroundColor: colors.teal }}
                                className="w-full flex justify-center items-center py-3 px-4 rounded-lg shadow-sm text-white hover:opacity-90 transition-all"
                            >
                                <FaEdit className="mr-2" /> Edit Profile
                            </button>
                            
                            <button
                                onClick={() => navigate('/users')}
                                className="w-full flex justify-center items-center py-3 px-4 rounded-lg shadow-sm text-white hover:opacity-90 transition-all bg-blue-600"
                            >
                                <FaUserFriends className="mr-2" /> View All Users
                            </button>
                            
                            <button
                                onClick={handleLogout}
                                className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 transition-all"
                            >
                                <FaSignOutAlt className="mr-2" /> Logout
                            </button>
                            
                            <button
                                onClick={handleDelete}
                                className="w-full flex justify-center items-center py-3 px-4 border border-red-300 rounded-lg shadow-sm text-red-600 hover:bg-red-50 transition-all"
                            >
                                <FaTrash className="mr-2" /> Delete Profile
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="text-center mt-4 text-gray-500 text-sm">
                    <p>BrainBoost &copy; {new Date().getFullYear()}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;