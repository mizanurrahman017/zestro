import React from "react";
import { Link } from "react-router";
import { FaArrowRight, FaUtensils, FaStar } from "react-icons/fa";

const Hero = () => {
    return (
        <section className="bg-[#F7F5EF] overflow-hidden">

            <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-20 lg:py-24">

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* ================= LEFT CONTENT ================= */}
                    <div>

                        {/* Small Badge */}
                        <div className="inline-flex items-center gap-2 bg-[#E7E5DF] px-4 py-2 rounded-full mb-6">

                            <FaUtensils className="text-[#B8A77A] text-sm" />

                            <span className="text-sm font-medium text-[#6F6B62]">
                                Welcome to ZESTRO
                            </span>

                        </div>


                        {/* Heading */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#252525] leading-[1.05] tracking-tight">

                            Taste the
                            <br />

                            <span className="text-[#B8A77A]">
                                Difference.
                            </span>

                        </h1>


                        {/* Description */}
                        <p className="mt-6 text-[#6F6B62] text-base md:text-lg leading-8 max-w-xl">

                            Discover delicious food crafted with fresh
                            ingredients, rich flavors, and a passion for
                            creating unforgettable dining experiences.

                        </p>


                        {/* Buttons */}
                        <div className="flex flex-wrap items-center gap-4 mt-8">

                            <Link
                                to="/menu/vQ5eOlXzEZK0WaruROok"
                                className="flex items-center gap-3 bg-[#252525] text-white px-7 py-3.5 rounded-full font-semibold hover:bg-[#B8A77A] transition-all duration-300"
                            >

                                Explore Menu

                                <FaArrowRight className="text-sm" />

                            </Link>


                            <a
                                href="#about"
                                className="px-7 py-3.5 rounded-full border border-[#D8D5CC] text-[#252525] font-semibold hover:bg-[#E7E5DF] transition-all duration-300"
                            >

                                Our Story

                            </a>

                        </div>


                        {/* Rating */}
                        <div className="flex items-center gap-4 mt-10">

                            <div className="flex items-center gap-1 text-[#B8A77A]">

                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />

                            </div>

                            <div className="h-5 w-px bg-[#D8D5CC]"></div>

                            <p className="text-sm text-[#6F6B62]">
                                Loved by our customers
                            </p>

                        </div>

                    </div>


                    {/* ================= RIGHT IMAGE ================= */}
                    <div className="relative">

                        {/* Decorative Circle */}
                        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#E7E5DF]"></div>


                        {/* Main Image */}
                        <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl">

                            <img
                                src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=85"
                                alt="Delicious restaurant food"
                                className="w-full h-[420px] md:h-[520px] object-cover"
                            />

                        </div>


                        {/* Floating Card */}
                        <div className="absolute z-20 -bottom-6 left-5 md:left-8 bg-[#F7F5EF] rounded-2xl shadow-xl p-4 md:p-5 flex items-center gap-4 border border-[#E0DDD4]">

                            <div className="w-12 h-12 rounded-full bg-[#252525] text-[#F7F5EF] flex items-center justify-center">

                                <FaUtensils />

                            </div>


                            <div>

                                <p className="text-xs text-[#8C877C] uppercase tracking-wider">
                                    Fresh & Delicious
                                </p>

                                <h3 className="font-bold text-[#252525] mt-1">
                                    Made with Love
                                </h3>

                            </div>

                        </div>


                        {/* Small Decorative Circle */}
                        <div className="absolute -bottom-10 -right-5 w-24 h-24 rounded-full border-8 border-[#B8A77A]/30"></div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default Hero;