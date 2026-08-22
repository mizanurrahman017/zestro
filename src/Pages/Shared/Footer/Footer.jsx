import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaGithub,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaUtensils,
} from "react-icons/fa";

const footer = () => {
    return (
        <footer className="bg-[#F7F5EF] text-[#252525] border-t border-[#D8D5CC]">

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-14">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-full bg-[#252525] text-[#F7F5EF] flex items-center justify-center">
                                <FaUtensils className="text-lg" />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold tracking-[0.15em]">
                                    ZESTRO
                                </h2>

                                <p className="text-[9px] tracking-[0.35em] text-[#A99668] uppercase">
                                    Restaurant
                                </p>
                            </div>

                        </div>

                        <p className="mt-5 text-sm leading-6 text-[#6F6B62] max-w-sm">
                            Experience delicious food, elegant dining and a smarter
                            way to order. Scan, explore and enjoy your meal with ZESTRO.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-3 mt-6">

                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-[#EFEDE6] border border-[#D8D5CC] flex items-center justify-center text-[#252525] hover:bg-[#A99668] hover:text-white hover:border-[#A99668] transition-all duration-300"
                            >
                                <FaFacebookF />
                            </a>

                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-[#EFEDE6] border border-[#D8D5CC] flex items-center justify-center text-[#252525] hover:bg-[#A99668] hover:text-white hover:border-[#A99668] transition-all duration-300"
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-[#EFEDE6] border border-[#D8D5CC] flex items-center justify-center text-[#252525] hover:bg-[#A99668] hover:text-white hover:border-[#A99668] transition-all duration-300"
                            >
                                <FaTwitter />
                            </a>

                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-[#EFEDE6] border border-[#D8D5CC] flex items-center justify-center text-[#252525] hover:bg-[#A99668] hover:text-white hover:border-[#A99668] transition-all duration-300"
                            >
                                <FaGithub />
                            </a>

                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>

                        <h3 className="text-lg font-semibold mb-5 text-[#252525]">
                            Quick Links
                        </h3>

                        <ul className="space-y-3 text-sm text-[#6F6B62]">

                            <li>
                                <a
                                    href="/"
                                    className="hover:text-[#A99668] transition-all duration-300"
                                >
                                    Home
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/menu"
                                    className="hover:text-[#A99668] transition-all duration-300"
                                >
                                    Our Menu
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/about"
                                    className="hover:text-[#A99668] transition-all duration-300"
                                >
                                    About Us
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/contact"
                                    className="hover:text-[#A99668] transition-all duration-300"
                                >
                                    Contact
                                </a>
                            </li>

                        </ul>
                    </div>

                    {/* Services */}
                    <div>

                        <h3 className="text-lg font-semibold mb-5 text-[#252525]">
                            Our Services
                        </h3>

                        <ul className="space-y-3 text-sm text-[#6F6B62]">

                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[#A99668] transition-all duration-300"
                                >
                                    QR Code Ordering
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[#A99668] transition-all duration-300"
                                >
                                    Digital Menu
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[#A99668] transition-all duration-300"
                                >
                                    Kitchen Management
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[#A99668] transition-all duration-300"
                                >
                                    Restaurant Management
                                </a>
                            </li>

                        </ul>
                    </div>

                    {/* Contact */}
                    <div>

                        <h3 className="text-lg font-semibold mb-5 text-[#252525]">
                            Contact Us
                        </h3>

                        <div className="space-y-4 text-sm text-[#6F6B62]">

                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-[#A99668] mt-1 shrink-0" />

                                <span>Sylhet, Bangladesh</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaPhoneAlt className="text-[#A99668] shrink-0" />

                                <span>+880 1XXX-XXXXXX</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-[#A99668] shrink-0" />

                                <span>support@zestro.com</span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-[#D8D5CC]">

                <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-5 flex flex-col md:flex-row justify-between items-center gap-3">

                    <p className="text-sm text-[#8A867D]">
                        © {new Date().getFullYear()} ZESTRO. All rights reserved.
                    </p>

                    <div className="flex gap-6 text-sm text-[#8A867D]">

                        <a
                            href="#"
                            className="hover:text-[#A99668] transition-all duration-300"
                        >
                            Privacy Policy
                        </a>

                        <a
                            href="#"
                            className="hover:text-[#A99668] transition-all duration-300"
                        >
                            Terms & Conditions
                        </a>

                    </div>

                </div>
            </div>

        </footer>
    );
};

export default footer;