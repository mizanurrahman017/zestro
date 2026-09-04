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

const Footer = () => {
    return (
        <footer className="bg-[#F7F5EF] text-[#252525] border-t border-[#D8D5CC]">

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 py-8 md:py-14">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 md:gap-10">

                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-1">

                        <div className="flex items-center gap-3">

                            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#252525] text-[#F7F5EF] flex items-center justify-center">
                                <FaUtensils className="text-base md:text-lg" />
                            </div>

                            <div>
                                <h2 className="text-xl md:text-2xl font-bold tracking-[0.15em]">
                                    ZESTRO
                                </h2>

                                <p className="text-[8px] md:text-[9px] tracking-[0.35em] text-[#A99668] uppercase">
                                    Restaurant
                                </p>
                            </div>

                        </div>

                        <p className="mt-4 md:mt-5 text-sm leading-6 text-[#6F6B62] max-w-sm">
                            Experience delicious food, elegant dining and a smarter
                            way to order. Scan, explore and enjoy your meal with ZESTRO.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-2.5 mt-5 md:mt-6">

                            <a
                                href="#"
                                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#EFEDE6] border border-[#D8D5CC] flex items-center justify-center text-[#252525] hover:bg-[#A99668] hover:text-white hover:border-[#A99668] transition-all duration-300"
                            >
                                <FaFacebookF className="text-sm" />
                            </a>

                            <a
                                href="#"
                                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#EFEDE6] border border-[#D8D5CC] flex items-center justify-center text-[#252525] hover:bg-[#A99668] hover:text-white hover:border-[#A99668] transition-all duration-300"
                            >
                                <FaInstagram className="text-sm" />
                            </a>

                            <a
                                href="#"
                                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#EFEDE6] border border-[#D8D5CC] flex items-center justify-center text-[#252525] hover:bg-[#A99668] hover:text-white hover:border-[#A99668] transition-all duration-300"
                            >
                                <FaTwitter className="text-sm" />
                            </a>

                            <a
                                href="#"
                                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#EFEDE6] border border-[#D8D5CC] flex items-center justify-center text-[#252525] hover:bg-[#A99668] hover:text-white hover:border-[#A99668] transition-all duration-300"
                            >
                                <FaGithub className="text-sm" />
                            </a>

                        </div>

                    </div>


                    {/* Quick Links + Contact Us */}
                    <div className="grid grid-cols-2 gap-5 sm:contents">

                        {/* Quick Links */}
                        <div>

                            <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-5">
                                Quick Links
                            </h3>

                            <ul className="space-y-2.5 md:space-y-3 text-sm text-[#6F6B62]">

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


                        {/* Contact Us */}
                        <div>

                            <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-5">
                                Contact Us
                            </h3>

                            <div className="space-y-3 md:space-y-4 text-sm text-[#6F6B62]">

                                {/* Location */}
                                <div className="flex items-start gap-3">

                                    <FaMapMarkerAlt className="text-[#A99668] mt-1 shrink-0" />

                                    <span>
                                        Sylhet, Bangladesh
                                    </span>

                                </div>


                                {/* Phone */}
                                <div className="flex items-center gap-3">

                                    <FaPhoneAlt className="text-[#A99668] shrink-0" />

                                    <span>
                                        +880 1XXX-XXXXXX
                                    </span>

                                </div>


                                {/* Email */}
                                <div className="flex items-start gap-3">

                                    <FaEnvelope className="text-[#A99668] mt-1 shrink-0" />

                                    <span className="break-all">
                                        support@zestro.com
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Our Services */}
                    {/* Mobile এ hide থাকবে */}
                    <div className="hidden md:block">

                        <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-5">
                            Our Services
                        </h3>

                        <ul className="space-y-2.5 md:space-y-3 text-sm text-[#6F6B62]">

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

                </div>

            </div>


            {/* Bottom Footer */}
            <div className="border-t border-[#D8D5CC]">

                <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 py-4 md:py-5 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-3">

                    {/* Copyright */}
                    <p className="text-xs md:text-sm text-[#8A867D] text-center">
                        © {new Date().getFullYear()} ZESTRO. All rights reserved.
                    </p>


                    {/* Policies */}
                    <div className="flex gap-5 md:gap-6 text-xs md:text-sm text-[#8A867D]">

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


                {/* Developer Credit */}
                <div className="border-t border-[#D8D5CC]">

                    <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 py-3 md:py-4 text-center">

                        <p className="text-xs md:text-sm text-[#8A867D]">

                            Designed & Developed by{" "}

                            <a
                                href="https://www.linkedin.com/in/mizanur-rahman-asif-599711383/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-[#A99668] hover:text-[#252525] transition-all duration-300 hover:underline"
                            >
                                Mizanur Rahman Asif
                            </a>

                        </p>

                    </div>

                </div>

            </div>

        </footer>
    );
};

export default Footer;