import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaInfoCircle, FaLock, FaUserPlus } from 'react-icons/fa';

// Color palette
const colors = {
  orange: "#FF7350",
  teal: "#125875",
};

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        
        const userData = { name, email, phone, bio, password };
        
        try {
            const response = await fetch('http://localhost:8080/api/users/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            
            if (response.ok) {
                const result = await response.json();
                console.log('User registered:', result);
                setSuccess('Registration successful! You can now login.');
                // Clear form
                setName('');
                setEmail('');
                setPhone('');
                setBio('');
                setPassword('');
            } else {
                setError('Registration failed. Please try again.');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-indigo-50 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                    <div style={{ 
                      background: `linear-gradient(to right, ${colors.teal}, ${colors.orange})`,
                      padding: '1.5rem'
                    }} className="text-center">
                        
                        <h1 className="text-2xl font-bold text-white">Create Your BrainBoost Account</h1>
                        <p className="text-white text-opacity-80 mt-1">Sign up to access the portal</p>
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
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaUser className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                                        style={{ 
                                          boxShadow: `0 0 0 ${name ? '2px' : '0'} ${colors.teal}`,
                                          borderColor: name ? colors.teal : 'rgb(209, 213, 219)'
                                        }}
                                        placeholder="Enter your full name"
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
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                                        style={{ 
                                          boxShadow: `0 0 0 ${email ? '2px' : '0'} ${colors.teal}`,
                                          borderColor: email ? colors.teal : 'rgb(209, 213, 219)'
                                        }}
                                        placeholder="Enter your email address"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2">Phone</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaPhone className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                                        style={{ 
                                          boxShadow: `0 0 0 ${phone ? '2px' : '0'} ${colors.teal}`,
                                          borderColor: phone ? colors.teal : 'rgb(209, 213, 219)'
                                        }}
                                        placeholder="Enter your phone number"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2">Bio (Optional)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaInfoCircle className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                                        style={{ 
                                          boxShadow: `0 0 0 ${bio ? '2px' : '0'} ${colors.teal}`,
                                          borderColor: bio ? colors.teal : 'rgb(209, 213, 219)'
                                        }}
                                        placeholder="Tell us a bit about yourself"
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                                        style={{ 
                                          boxShadow: `0 0 0 ${password ? '2px' : '0'} ${colors.teal}`,
                                          borderColor: password ? colors.teal : 'rgb(209, 213, 219)'
                                        }}
                                        placeholder="Create a secure password"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center mb-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    style={{ 
                                      backgroundColor: colors.orange,
                                      borderColor: 'transparent',
                                      opacity: loading ? 0.7 : 1
                                    }}
                                    className="w-full flex justify-center items-center py-3 px-4 border rounded-lg shadow-sm text-white hover:opacity-90 transition-all"
                                >
                                    {loading ? "Registering..." : <><FaUserPlus className="mr-2" /> Register</>}
                                </button>
                            </div>
                        </form>
                    </div>
                    
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account? {" "}
                            <Link to="/login" style={{ color: colors.teal, fontWeight: 500 }} className="hover:opacity-80">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;