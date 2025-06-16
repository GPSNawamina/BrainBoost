import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaUser, FaUserPlus, FaUserCheck } from 'react-icons/fa';

// Color palette
const colors = {
  orange: "#FF7350",
  teal: "#125875",
};

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [following, setFollowing] = useState([]); // Track who you've followed
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const currentUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const res = await axios.get('http://localhost:8080/api/users/all');
                setUsers(res.data);
                
                // If user is logged in, we could also fetch their following list here
                if (currentUser) {
                    try {
                        const followingRes = await axios.get(`http://localhost:8080/api/users/${currentUser.id}/following`);
                        setFollowing(followingRes.data.map(user => user.id));
                    } catch (err) {
                        console.error('Error fetching following list:', err);
                    }
                }
            } catch (err) {
                console.error('Error fetching users:', err);
                setError('Failed to load users. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleFollow = async (userIdToFollow) => {
        if (!currentUser) {
            alert('You must be logged in to follow users');
            return;
        }

        try {
            const res = await axios.put(`http://localhost:8080/api/users/follow/${userIdToFollow}/${currentUser.id}`);
            // Update UI: add userIdToFollow to following list
            setFollowing(prev => [...prev, userIdToFollow]);
        } catch (err) {
            console.error('Error following user:', err);
            alert('Failed to follow user');
        }
    };

    const handleUnfollow = async (userIdToUnfollow) => {
        if (!currentUser) return;

        try {
            const res = await axios.put(`http://localhost:8080/api/users/unfollow/${userIdToUnfollow}/${currentUser.id}`);
            // Update UI: remove userIdToUnfollow from following list
            setFollowing(prev => prev.filter(id => id !== userIdToUnfollow));
        } catch (err) {
            console.error('Error unfollowing user:', err);
            alert('Failed to unfollow user');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-indigo-50 p-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 mb-6">
                    <div style={{ 
                      background: `linear-gradient(to right, ${colors.teal}, ${colors.orange})`,
                      padding: '1.5rem'
                    }} className="text-center">
                        <h1 className="text-2xl font-bold text-white">BrainBoost Community</h1>
                        <p className="text-white text-opacity-80 mt-1">Connect with other learners</p>
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
                        
                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: colors.teal }}></div>
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {users.length === 0 ? (
                                    <li className="py-8 text-center text-gray-500">No users found</li>
                                ) : (
                                    users.map(user => {
                                        const isCurrentUser = user.id === currentUser?.id;
                                        const isFollowing = following.includes(user.id);

                                        return (
                                            <li key={user.id} className="py-4 flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center" style={{ backgroundColor: colors.teal + '20' }}>
                                                        {user.profileImageUrl ? (
                                                            <img
                                                                src={user.profileImageUrl}
                                                                alt={user.name}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <FaUser className="text-gray-400" size={20} />
                                                        )}
                                                    </div>
                                                    <div className="ml-4">
                                                        <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                                                        <p className="text-sm text-gray-500">{user.email}</p>
                                                    </div>
                                                </div>
                                                
                                                {!isCurrentUser && (
                                                    isFollowing ? (
                                                        <button
                                                            onClick={() => handleUnfollow(user.id)}
                                                            className="flex items-center px-4 py-2 border rounded-lg font-medium text-sm transition-all"
                                                            style={{ 
                                                                color: colors.teal,
                                                                borderColor: colors.teal,
                                                                backgroundColor: 'white'
                                                            }}
                                                        >
                                                            <FaUserCheck className="mr-2" /> Following
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleFollow(user.id)}
                                                            className="flex items-center px-4 py-2 border rounded-lg text-white font-medium text-sm transition-all hover:opacity-90"
                                                            style={{ 
                                                                backgroundColor: colors.orange,
                                                                borderColor: 'transparent'
                                                            }}
                                                        >
                                                            <FaUserPlus className="mr-2" /> Follow
                                                        </button>
                                                    )
                                                )}
                                            </li>
                                        );
                                    })
                                )}
                            </ul>
                        )}
                    </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                    <Link 
                        to="/profile"
                        className="text-sm font-medium hover:opacity-80 transition-opacity"
                        style={{ color: colors.teal }}
                    >
                        Back to Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;