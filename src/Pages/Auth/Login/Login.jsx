import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaUserCircle, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import { useAuth } from "../../../Hooks/useAuth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { user, loginUser, logoutUser } = useAuth();
    const navigate = useNavigate();

    // Login
    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            await loginUser(email, password);

            // Login successful
            navigate("/");
        } catch (error) {
            console.error(error);

            if (error.code === "auth/invalid-credential") {
                setError("Email or password is incorrect.");
            } else if (error.code === "auth/user-not-found") {
                setError("No account found with this email.");
            } else if (error.code === "auth/wrong-password") {
                setError("Wrong password.");
            } else {
                setError("Login failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Logout
    const handleLogout = async () => {
        try {
            await logoutUser();
            setEmail("");
            setPassword("");
        } catch (error) {
            console.error(error);
        }
    };


    // ==========================
    // USER PROFILE
    // ==========================

    if (user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f5f3ee] px-4">

                <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

                    {/* Profile Icon */}
                    <div className="flex justify-center mb-5">
                        <div className="w-24 h-24 rounded-full bg-[#262626] flex items-center justify-center">
                            <FaUserCircle className="text-white text-6xl" />
                        </div>
                    </div>

                    {/* Welcome */}
                    <div className="text-center">

                        <h1 className="text-2xl font-bold text-[#262626]">
                            Welcome Back! 👋
                        </h1>

                        <p className="text-gray-500 mt-2">
                            You are successfully logged in.
                        </p>

                    </div>


                    {/* Profile Information */}
                    <div className="mt-8 bg-[#f5f3ee] rounded-2xl p-5">

                        <div className="mb-4">

                            <p className="text-sm text-gray-500">
                                Email
                            </p>

                            <p className="font-semibold text-[#262626] break-all">
                                {user.email}
                            </p>

                        </div>


                        <div>

                            <p className="text-sm text-gray-500">
                                User ID
                            </p>

                            <p className="text-xs text-gray-600 break-all">
                                {user.uid}
                            </p>

                        </div>

                    </div>


                    {/* Dashboard */}
                    <Link
                        to="/admin/dashboard"
                        className="mt-6 w-full bg-[#262626] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#333333] transition duration-300"
                    >
                        <FaTachometerAlt />
                        Go to Dashboard
                    </Link>


                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="mt-3 w-full border border-red-500 text-red-500 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition duration-300"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>

                </div>

            </div>
        );
    }


    // ==========================
    // LOGIN FORM
    // ==========================

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f3ee] px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

                {/* Title */}
                <div className="text-center mb-8">

                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-[#262626] flex items-center justify-center">
                            <FaUserCircle className="text-white text-4xl" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-[#262626]">
                        Welcome Back
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Login to your ZESTRO account
                    </p>

                </div>


                {/* Error */}
                {error && (
                    <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-5 text-sm">
                        {error}
                    </div>
                )}


                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-5">

                    {/* Email */}
                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#262626] focus:ring-1 focus:ring-[#262626]"
                        />

                    </div>


                    {/* Password */}
                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#262626] focus:ring-1 focus:ring-[#262626]"
                        />

                    </div>


                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#262626] text-white py-3 rounded-lg font-semibold hover:bg-[#333333] transition duration-300 disabled:opacity-60"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>


                {/* Register */}
                <p className="text-center text-gray-600 mt-6">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="font-semibold text-[#262626] hover:underline"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
};

export default Login;