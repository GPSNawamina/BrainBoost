import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';

// Color palette
const colors = {
  orange: "#FF7350",
  teal: "#125875",
};

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        
        try {
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            if (response.ok) {
                const user = await response.json();
                console.log('Logged in user:', user);
                // Save user in localStorage (or context)
                localStorage.setItem('user', JSON.stringify(user));
                setSuccess('Login successful!');
                // Redirect to profile page
                setTimeout(() => {
                    navigate('/profile');
                }, 1000);
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            console.error('Login failed:', err);
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
                        <h1 className="text-2xl font-bold text-white">Welcome Back to BrainBoost</h1>
                        <p className="text-white text-opacity-80 mt-1">Sign in to access your account</p>
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
                            
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-gray-700 text-sm font-medium">Password</label>
                                    <Link to="/forgot-password" className="text-xs font-medium" style={{ color: colors.teal }}>
                                        Forgot Password?
                                    </Link>
                                </div>
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
                                        placeholder="Enter your password"
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
                                    {loading ? "Signing in..." : <><FaSignInAlt className="mr-2" /> Sign In</>}
                                </button>
                            </div>
                        </form>
                    </div>
                    
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account? {" "}
                            <Link to="/register" style={{ color: colors.teal, fontWeight: 500 }} className="hover:opacity-80">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;