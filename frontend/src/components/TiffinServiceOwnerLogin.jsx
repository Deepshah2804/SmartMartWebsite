import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import LoginContext from '../context/LoginContext';

const OwnerLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { loggedin, setLoggedin, email, setEmail , userType , setUserType } = useContext(LoginContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}tiffinowners`);
                if (!response.ok) {
                    throw new Error("Network response was not okay!");
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.log("Error fetching the data:", error);
                setError("Error fetching the data.");
            }
        }
        fetchData();
    }, [loggedin]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const isValidUser = data.some(user => user.email === formData.email && user.password === formData.password);

            if (isValidUser) {
                setLoggedin(true);
                setEmail(formData.email);
                setUserType('tiffinOwner')
                console.log("Account verified successfully !!!");
                setSuccess("Login successful! ");
                setTimeout(() => navigate('/TiffinServiceOwner/Dashboard'), 1300);
            } else {
                console.log("Account verification failed !");
                setError("Invalid email or password. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting the form:", error);
            setError("Error submitting the form.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Login</h2>
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
                {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            name="email"
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <p className="text-md text-gray-700 text-center mt-4">
                        Don't have an account?
                    </p>
                    <div className="flex justify-center space-x-2 mt-2">
                        <NavLink
                            className="text-blue-500 font-semibold hover:text-blue-700"
                            to="/tiffinserviceowner/register"
                        >
                            Sign up as Tiffin Service Owner
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OwnerLogin;
