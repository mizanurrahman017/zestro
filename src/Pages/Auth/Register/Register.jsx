import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";

import AuthContext from "../../../Contexts/AuthContext/AuthContext";
import { db } from "../../../Firebase/Firebase.init";

import {
  doc,
  setDoc,
  collection,
} from "firebase/firestore";

const Register = () => {
  const { registerUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const form = e.target;

    const ownerName = form.ownerName.value;
    const restaurantName = form.restaurantName.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    // Password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    // Password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      // Create Firebase Authentication user
      const result = await registerUser(email, password);

      const user = result.user;

      // Create restaurant document ID
      const restaurantRef = doc(collection(db, "restaurants"));

      const restaurantId = restaurantRef.id;

      // Save restaurant information
      await setDoc(restaurantRef, {
        restaurantId,
        restaurantName,
        ownerId: user.uid,
        ownerName,
        email,
        createdAt: new Date(),
      });

      // Save owner information
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: ownerName,
        email,
        role: "owner",
        restaurantId,
        createdAt: new Date(),
      });

      // Go to dashboard
      navigate("/admin/dashboard");

    } catch (error) {
      console.error(error);

      if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (error.code === "auth/weak-password") {
        setError("Password is too weak.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#252525] text-[#F7F5EF] mb-4">
            🍽️
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#252525]">
            Create Your Account
          </h1>

          <p className="mt-2 text-[#6F6B62]">
            Start managing your restaurant with ZESTRO
          </p>

        </div>


        {/* Register Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-[#E5E1D8]">

          <form onSubmit={handleRegister} className="space-y-5">

            {/* Owner Name */}
            <div>
              <label className="block text-sm font-medium text-[#252525] mb-2">
                Owner Name
              </label>

              <input
                type="text"
                name="ownerName"
                placeholder="Enter your name"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#D8D4CA] bg-[#FAF9F5] outline-none focus:border-[#252525] transition"
              />
            </div>


            {/* Restaurant Name */}
            <div>
              <label className="block text-sm font-medium text-[#252525] mb-2">
                Restaurant Name
              </label>

              <input
                type="text"
                name="restaurantName"
                placeholder="Enter restaurant name"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#D8D4CA] bg-[#FAF9F5] outline-none focus:border-[#252525] transition"
              />
            </div>


            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#252525] mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="owner@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#D8D4CA] bg-[#FAF9F5] outline-none focus:border-[#252525] transition"
              />
            </div>


            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#252525] mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#D8D4CA] bg-[#FAF9F5] outline-none focus:border-[#252525] transition"
              />
            </div>


            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-[#252525] mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#D8D4CA] bg-[#FAF9F5] outline-none focus:border-[#252525] transition"
              />
            </div>


            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}


            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#252525] hover:bg-[#3A3A3A] text-white py-3.5 rounded-xl font-semibold transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>


          {/* Login */}
          <div className="text-center mt-6">

            <p className="text-sm text-[#6F6B62]">
              Already have an account?
            </p>

            <Link
              to="/login"
              className="inline-block mt-1 font-semibold text-[#252525] hover:underline"
            >
              Login
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;