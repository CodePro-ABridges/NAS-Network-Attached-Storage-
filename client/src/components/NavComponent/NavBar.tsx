import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaTachometerAlt,
  FaUpload,
  FaDownload,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserPlus,
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi2";
import { useAppSelector, useAppDispatch } from "../../store/hooks.ts";
import { clearUser } from "../../store/slices/userSlice.ts";
import { toggleNavbar } from "../../store/slices/navbarSlice.ts";

const Navbar: React.FC = () => {
  //redux
  const isOpen = useAppSelector((state) => state.navbar.isOpen);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const dispatch = useAppDispatch();

  //TODO: Might add additional logic such as Upload, download.
  const handleLogout = () => {
    dispatch(clearUser());
  };

  const navbarVariants = {
    open: { x: 0, transition: { duration: 0.3 } },
    closed: { x: "-100%", transition: { duration: 0.3 } },
  };

  const arrowVariants = {
    open: { rotate: 180, transition: { duration: 0.3 } },
    closed: { rotate: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-5 z-20"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={navbarVariants}
      >
        <nav className="mt-10">
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <FaHome />
                <span>Home</span>
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 hover:text-gray-300"
                  >
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/upload"
                    className="flex items-center space-x-2 hover:text-gray-300"
                  >
                    <FaUpload />
                    <span>Upload</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/download"
                    className="flex items-center space-x-2 hover:text-gray-300"
                  >
                    <FaDownload />
                    <span>Download</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 hover:text-gray-300"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </li>
              </>
            )}
            {!isAuthenticated && (
              <>
                <li>
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 hover:text-gray-300"
                  >
                    <FaSignInAlt />
                    <span>Login</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="flex items-center space-x-2 hover:text-gray-300"
                  >
                    <FaUserPlus />
                    <span>Register</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </motion.div>
      <motion.button
        className="fixed top-5 left-5 z-30 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
        onClick={() => dispatch(toggleNavbar())}
        animate={isOpen ? "open" : "closed"}
        variants={arrowVariants}
      >
        <HiArrowRight />
      </motion.button>
    </>
  );
};

export default Navbar;
