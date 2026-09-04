import React, { useContext } from "react";
import { Link } from "react-router";

import {
  FaShoppingCart,
  FaBars,
  FaUserCircle,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "../../../Hooks/useAuth";
import CartContext from "../../../Contexts/CartContext/CartContext";

const NavBar = () => {
  // ==========================
  // AUTH
  // ==========================

  const { user, userData, logoutUser } = useAuth();

  // ==========================
  // CART
  // ==========================

  const { cartItems } = useContext(CartContext);

  const cartCount = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  // ==========================
  // LOGOUT
  // ==========================

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // ==========================
  // USER NAME
  // ==========================

  const getUserName = () => {
    if (userData?.name) {
      return userData.name;
    }

    if (user?.email) {
      return user.email.split("@")[0];
    }

    return "Account";
  };

  // ==========================
  // DASHBOARD LINK
  // ==========================

  const getDashboardLink = () => {
    if (userData?.role === "owner") {
      return "/admin/dashboard";
    }

    if (userData?.role === "kitchen") {
      return "/kitchen";
    }

    return null;
  };

  const dashboardLink = getDashboardLink();

  return (
    <nav
      className="
        sticky
        top-0
        z-50
        bg-[#F7F5EF]/95
        backdrop-blur-md
        border-b
        border-[#D8D5CC]
        shadow-sm
      "
    >
      <div
        className="
          navbar
          max-w-7xl
          mx-auto
          px-4
          md:px-8
          lg:px-12
        "
      >
        {/* ==========================
            LOGO
        ========================== */}

        <div className="navbar-start">
          <Link
            to="/"
            className="
              flex
              items-center
              gap-3
              text-[#252525]
              hover:text-[#B8A77A]
              transition-all
              duration-300
            "
          >
            <div
              className="
                w-10
                h-10
                rounded-full
                overflow-hidden
                flex
                items-center
                justify-center
              "
            >
              <img
                src="/zestro.jpg"
                alt="ZESTRO Logo"
                className="
                  w-full
                  h-full
                  object-cover
                "
              />
            </div>

            <div>
              <h1
                className="
                  text-2xl
                  font-bold
                  tracking-[0.15em]
                "
              >
                ZESTRO
              </h1>

              <p
                className="
                  text-[9px]
                  tracking-[0.35em]
                  text-[#8C877C]
                  uppercase
                  -mt-1
                "
              >
                Restaurant
              </p>
            </div>
          </Link>
        </div>

        {/* ==========================
            DESKTOP MENU
        ========================== */}

        <div
          className="
            navbar-center
            hidden
            lg:flex
          "
        >
          <ul
            className="
              flex
              items-center
              gap-2
            "
          >
            {/* HOME */}

            <li>
              <Link
                to="/"
                className="
                  px-5
                  py-2
                  text-sm
                  font-medium
                  text-[#3A3935]
                  rounded-full
                  hover:bg-[#E7E5DF]
                  hover:text-[#252525]
                  transition-all
                "
              >
                Home
              </Link>
            </li>

            {/* MENU */}

            <li>
              <Link
                to="/menu/vQ5eOlXzEZK0WaruROok"
                className="
                  px-5
                  py-2
                  text-sm
                  font-medium
                  text-[#3A3935]
                  rounded-full
                  hover:bg-[#E7E5DF]
                  hover:text-[#252525]
                  transition-all
                "
              >
                Menu
              </Link>
            </li>

            {/* ABOUT */}

            <li>
              <Link
                to="/about"
                className="
                  px-5
                  py-2
                  text-sm
                  font-medium
                  text-[#3A3935]
                  rounded-full
                  hover:bg-[#E7E5DF]
                  hover:text-[#252525]
                  transition-all
                "
              >
                About
              </Link>
            </li>

            {/* CONTACT */}

            <li>
              <Link
                to="/contact"
                className="
                  px-5
                  py-2
                  text-sm
                  font-medium
                  text-[#3A3935]
                  rounded-full
                  hover:bg-[#E7E5DF]
                  hover:text-[#252525]
                  transition-all
                "
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* ==========================
            RIGHT SIDE
        ========================== */}

        <div
          className="
            navbar-end
            gap-2
          "
        >
          {/* ==========================
              CART
          ========================== */}

          <Link
            to="/cart"
            className="
              relative
              w-11
              h-11
              rounded-full
              flex
              items-center
              justify-center
              text-[#252525]
              hover:bg-[#E7E5DF]
              hover:text-[#B8A77A]
              transition-all
            "
          >
            <FaShoppingCart className="text-lg" />

            {cartCount > 0 && (
              <span
                className="
                  absolute
                  -top-1
                  -right-1
                  min-w-5
                  h-5
                  px-1
                  rounded-full
                  bg-[#252525]
                  text-[#F7F5EF]
                  text-[10px]
                  font-bold
                  flex
                  items-center
                  justify-center
                "
              >
                {cartCount}
              </span>
            )}
          </Link>

          {/* ==========================
              DESKTOP USER
          ========================== */}

          {user ? (
            <div
              className="
                dropdown
                dropdown-end
                hidden
                sm:block
              "
            >
              <button
                tabIndex={0}
                className="
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  rounded-full
                  text-[#252525]
                  hover:bg-[#E7E5DF]
                "
              >
                <FaUserCircle
                  className="
                    text-3xl
                    text-[#252525]
                  "
                />

                <div
                  className="
                    hidden
                    md:block
                    text-left
                  "
                >
                  <p
                    className="
                      text-sm
                      font-semibold
                      text-[#252525]
                    "
                  >
                    {getUserName()}
                  </p>

                  <p
                    className="
                      text-[10px]
                      text-[#8C877C]
                      capitalize
                    "
                  >
                    {userData?.role || "Customer"}
                  </p>
                </div>
              </button>

              {/* USER DROPDOWN */}

              <ul
                tabIndex={0}
                className="
                  menu
                  dropdown-content
                  bg-[#F7F5EF]
                  text-[#252525]
                  border
                  border-[#D8D5CC]
                  rounded-2xl
                  z-50
                  mt-4
                  w-64
                  p-3
                  shadow-xl

                  [&_a]:text-[#252525]
                  [&_a:hover]:text-[#252525]
                "
              >
                {/* USER INFORMATION */}

                <li
                  className="
                    mb-2
                    pointer-events-none
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      px-3
                      py-3
                      bg-[#E7E5DF]
                      rounded-xl
                    "
                  >
                    <FaUserCircle
                      className="
                        text-3xl
                        text-[#252525]
                      "
                    />

                    <div className="min-w-0">
                      <p
                        className="
                          font-semibold
                          text-[#252525]
                          truncate
                        "
                      >
                        {getUserName()}
                      </p>

                      <p
                        className="
                          text-xs
                          text-[#6F6B62]
                          truncate
                        "
                      >
                        {user.email}
                      </p>

                      <p
                        className="
                          text-[10px]
                          text-[#9A8654]
                          capitalize
                          mt-1
                        "
                      >
                        {userData?.role || "customer"}
                      </p>
                    </div>
                  </div>
                </li>

                {/* DASHBOARD */}

                {dashboardLink && (
                  <li>
                    <Link
                      to={dashboardLink}
                      className="
                        text-[#252525]
                        hover:bg-[#E7E5DF]
                        hover:text-[#252525]
                      "
                    >
                      <FaTachometerAlt />

                      {userData?.role === "owner"
                        ? "Admin Dashboard"
                        : "Kitchen Dashboard"}
                    </Link>
                  </li>
                )}

                {/* DIVIDER */}

                <div
                  className="
                    border-t
                    border-[#D8D5CC]
                    my-2
                  "
                ></div>

                {/* LOGOUT */}

                <li>
                  <button
                    onClick={handleLogout}
                    className="
                      text-red-500
                      hover:bg-red-50
                      hover:text-red-600
                    "
                  >
                    <FaSignOutAlt />

                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            /* LOGIN */

            <Link
              to="/login"
              className="
                hidden
                sm:flex
                items-center
                justify-center
                px-6
                py-2.5
                rounded-full
                bg-[#252525]
                text-[#F7F5EF]
                text-sm
                font-medium
                hover:bg-[#B8A77A]
                transition-all
              "
            >
              Login
            </Link>
          )}

          {/* ==========================
              MOBILE MENU
          ========================== */}

          <div
            className="
              dropdown
              dropdown-end
              lg:hidden
            "
          >
            <button
              tabIndex={0}
              className="
                w-11
                h-11
                rounded-full
                flex
                items-center
                justify-center
                text-[#252525]
                hover:bg-[#E7E5DF]
                hover:text-[#252525]
                transition-all
              "
            >
              <FaBars className="text-xl" />
            </button>

            {/* MOBILE DROPDOWN */}

            <ul
              tabIndex={0}
              className="
                menu
                dropdown-content
                bg-[#F7F5EF]
                text-[#252525]
                border
                border-[#D8D5CC]
                rounded-2xl
                z-50
                mt-4
                w-64
                p-3
                shadow-xl

                [&_a]:text-[#252525]
                [&_a:hover]:text-[#252525]
                [&_button]:text-[#252525]
              "
            >
              {/* ==========================
                  HOME
              ========================== */}

              <li>
                <Link
                  to="/"
                  className="
                    text-[#252525]
                    hover:bg-[#E7E5DF]
                    hover:text-[#252525]
                  "
                >
                  Home
                </Link>
              </li>

              {/* ==========================
                  MENU
              ========================== */}

              <li>
                <Link
                  to="/menu/vQ5eOlXzEZK0WaruROok"
                  className="
                    text-[#252525]
                    hover:bg-[#E7E5DF]
                    hover:text-[#252525]
                  "
                >
                  Menu
                </Link>
              </li>

              {/* ==========================
                  ABOUT
              ========================== */}

              <li>
                <Link
                  to="/about"
                  className="
                    text-[#252525]
                    hover:bg-[#E7E5DF]
                    hover:text-[#252525]
                  "
                >
                  About
                </Link>
              </li>

              {/* ==========================
                  CONTACT
              ========================== */}

              <li>
                <Link
                  to="/contact"
                  className="
                    text-[#252525]
                    hover:bg-[#E7E5DF]
                    hover:text-[#252525]
                  "
                >
                  Contact
                </Link>
              </li>

              {/* ==========================
                  LOGGED IN USER
              ========================== */}

              {user && (
                <>
                  {/* DIVIDER */}

                  <div
                    className="
                      border-t
                      border-[#D8D5CC]
                      my-2
                    "
                  ></div>

                  {/* USER INFO */}

                  <li
                    className="
                      pointer-events-none
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        bg-[#E7E5DF]
                        rounded-xl
                        px-3
                        py-3
                      "
                    >
                      <FaUserCircle
                        className="
                          text-2xl
                          text-[#252525]
                        "
                      />

                      <div className="min-w-0">
                        <p
                          className="
                            font-semibold
                            text-[#252525]
                            truncate
                          "
                        >
                          {getUserName()}
                        </p>

                        <p
                          className="
                            text-xs
                            text-[#6F6B62]
                            truncate
                          "
                        >
                          {user.email}
                        </p>

                        <p
                          className="
                            text-[10px]
                            text-[#9A8654]
                            capitalize
                          "
                        >
                          {userData?.role || "customer"}
                        </p>
                      </div>
                    </div>
                  </li>

                  {/* DASHBOARD */}

                  {dashboardLink && (
                    <li>
                      <Link
                        to={dashboardLink}
                        className="
                          text-[#252525]
                          hover:bg-[#E7E5DF]
                          hover:text-[#252525]
                        "
                      >
                        <FaTachometerAlt />

                        {userData?.role === "owner"
                          ? "Admin Dashboard"
                          : "Kitchen Dashboard"}
                      </Link>
                    </li>
                  )}

                  {/* LOGOUT */}

                  <li>
                    <button
                      onClick={handleLogout}
                      className="
                        text-red-500
                        hover:bg-red-50
                        hover:text-red-600
                      "
                    >
                      <FaSignOutAlt />

                      Logout
                    </button>
                  </li>
                </>
              )}

              {/* ==========================
                  MOBILE LOGIN
              ========================== */}

              {!user && (
                <>
                  <div
                    className="
                      border-t
                      border-[#D8D5CC]
                      my-2
                    "
                  ></div>

                  <li>
                    <Link
                      to="/login"
                      className="
                        font-semibold
                        text-[#252525]
                        hover:bg-[#E7E5DF]
                        hover:text-[#252525]
                      "
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;