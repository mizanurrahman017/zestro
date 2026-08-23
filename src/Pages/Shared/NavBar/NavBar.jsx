import React from "react";
import { Link } from "react-router";
import {
  FaUtensils,
  FaShoppingCart,
  FaBars,
  FaUserCircle,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "../../../Hooks/useAuth";

const NavBar = () => {
  const { user, logoutUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#F7F5EF]/95 backdrop-blur-md border-b border-[#D8D5CC] shadow-sm">

      <div className="navbar max-w-7xl mx-auto px-4 md:px-8 lg:px-12">

        {/* ================= LOGO ================= */}
        <div className="navbar-start">
          <Link
            to="/"
            className="flex items-center gap-3 text-[#252525] hover:text-[#B8A77A] transition-all duration-300"
          >
            {/* Logo Image */}
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
              <img
                src="/public/zestro.jpg"
                alt="ZESTRO Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-[0.15em]">
                ZESTRO
              </h1>

              <p className="text-[9px] tracking-[0.35em] text-[#8C877C] uppercase -mt-1">
                Restaurant
              </p>
            </div>
          </Link>
        </div>


        {/* ================= DESKTOP MENU ================= */}
        <div className="navbar-center hidden lg:flex">

          <ul className="flex items-center gap-2">

            <li>
              <Link
                to="/"
                className="px-5 py-2 text-sm font-medium text-[#3A3935] rounded-full hover:bg-[#E7E5DF] hover:text-[#252525] transition-all duration-300"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/menu/vQ5eOlXzEZK0WaruROok"
                className="px-5 py-2 text-sm font-medium text-[#3A3935] rounded-full hover:bg-[#E7E5DF] hover:text-[#252525] transition-all duration-300"
              >
                Menu
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="px-5 py-2 text-sm font-medium text-[#3A3935] rounded-full hover:bg-[#E7E5DF] hover:text-[#252525] transition-all duration-300"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="px-5 py-2 text-sm font-medium text-[#3A3935] rounded-full hover:bg-[#E7E5DF] hover:text-[#252525] transition-all duration-300"
              >
                Contact
              </Link>
            </li>

          </ul>

        </div>


        {/* ================= RIGHT SIDE ================= */}
        <div className="navbar-end gap-2">


          {/* CART */}
          <Link
            to="/cart"
            className="relative w-11 h-11 rounded-full flex items-center justify-center text-[#252525] hover:bg-[#E7E5DF] hover:text-[#B8A77A] transition-all duration-300"
          >
            <FaShoppingCart className="text-lg" />

            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#252525] text-[#F7F5EF] text-[10px] flex items-center justify-center">
              0
            </span>
          </Link>


          {/* ================= LOGGED IN PROFILE ================= */}
          {user ? (

            <div className="dropdown dropdown-end hidden sm:block">

              <button
                tabIndex={0}
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-[#E7E5DF] transition-all duration-300"
              >

                <FaUserCircle className="text-3xl text-[#252525]" />

                <div className="hidden md:block text-left">

                  <p className="text-sm font-semibold text-[#252525] max-w-[130px] truncate">
                    {user.email?.split("@")[0]}
                  </p>

                  <p className="text-[10px] text-[#8C877C]">
                    Account
                  </p>

                </div>

              </button>


              {/* Profile Dropdown */}
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-[#F7F5EF] border border-[#D8D5CC] rounded-2xl z-50 mt-4 w-64 p-3 shadow-xl"
              >

                {/* User Info */}
                <li className="mb-2 pointer-events-none">

                  <div className="flex items-center gap-3 px-3 py-3 bg-[#E7E5DF] rounded-xl">

                    <FaUserCircle className="text-3xl text-[#252525]" />

                    <div className="min-w-0">

                      <p className="font-semibold text-[#252525] truncate">
                        {user.email?.split("@")[0]}
                      </p>

                      <p className="text-xs text-[#6F6B62] truncate">
                        {user.email}
                      </p>

                    </div>

                  </div>

                </li>


                {/* Dashboard */}
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="text-[#3A3935] hover:bg-[#E7E5DF]"
                  >
                    <FaTachometerAlt />
                    Dashboard
                  </Link>
                </li>


                {/* Profile */}
                <li>
                  <Link
                    to="/profile"
                    className="text-[#3A3935] hover:bg-[#E7E5DF]"
                  >
                    <FaUserCircle />
                    Profile
                  </Link>
                </li>


                {/* Divider */}
                <div className="border-t border-[#D8D5CC] my-2"></div>


                {/* Logout */}
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:bg-red-50"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </li>

              </ul>

            </div>

          ) : (

            /* ================= LOGIN ================= */
            <Link
              to="/login"
              className="hidden sm:flex items-center justify-center px-6 py-2.5 rounded-full bg-[#252525] text-[#F7F5EF] text-sm font-medium hover:bg-[#B8A77A] hover:text-white transition-all duration-300"
            >
              Login
            </Link>

          )}


          {/* ================= MOBILE MENU ================= */}
          <div className="dropdown dropdown-end lg:hidden">

            <button
              tabIndex={0}
              className="w-11 h-11 rounded-full flex items-center justify-center text-[#252525] hover:bg-[#E7E5DF] transition-all duration-300"
            >
              <FaBars className="text-xl" />
            </button>


            <ul
              tabIndex={0}
              className="menu dropdown-content bg-[#F7F5EF] border border-[#D8D5CC] rounded-2xl z-50 mt-4 w-64 p-3 shadow-xl"
            >

              <li>
                <Link
                  to="/"
                  className="text-[#3A3935] hover:bg-[#E7E5DF]"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/menu"
                  className="text-[#3A3935] hover:bg-[#E7E5DF]"
                >
                  Menu
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-[#3A3935] hover:bg-[#E7E5DF]"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-[#3A3935] hover:bg-[#E7E5DF]"
                >
                  Contact
                </Link>
              </li>


              {/* Mobile Logged In */}
              {user ? (
                <>
                  <div className="border-t border-[#D8D5CC] my-2"></div>

                  <li>
                    <Link
                      to="/admin/dashboard"
                      className="text-[#3A3935] hover:bg-[#E7E5DF]"
                    >
                      <FaTachometerAlt />
                      Dashboard
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/profile"
                      className="text-[#3A3935] hover:bg-[#E7E5DF]"
                    >
                      <FaUserCircle />
                      Profile
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 hover:bg-red-50"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </li>
                </>
              ) : (

                /* Mobile Login */
                <li className="sm:hidden mt-2">

                  <Link
                    to="/login"
                    className="bg-[#252525] text-[#F7F5EF] hover:bg-[#B8A77A]"
                  >
                    Login
                  </Link>

                </li>

              )}

            </ul>

          </div>

        </div>

      </div>

    </nav>
  );
};

export default NavBar;