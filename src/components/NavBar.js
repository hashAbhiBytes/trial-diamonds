


import React from 'react';
import { Link } from 'react-router-dom';
import { FaGem, FaSignOutAlt } from 'react-icons/fa'; // Import icons
import './Navbar.css'; // Include the custom CSS for additional styling

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black shadow-sm">
            <div className="container-fluid">
                {/* Leftmost: Diamond Icon and Text */}
                <Link className="navbar-brand fw-bold text-white d-flex align-items-center" to="/">
                    <FaGem className="me-2" /> {/* Diamond icon */}
                    Diamond
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* Navigation Links */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active text-white" aria-current="page" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/my">
                                My Listing
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/explore">
                                Explore
                            </Link>
                        </li>
                    </ul>
                    {/* Rightmost: Sign-Out Option */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link text-white d-flex align-items-center" to="/signout">
                                <FaSignOutAlt className="me-1" /> {/* Door icon */}
                                Sign Out
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
