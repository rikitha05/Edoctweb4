import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api"; // Assuming this is where your axios instance is stored
import "../CSS/AdminDashboard.css";

function AdminDashboard() {
  const [adminName, setAdminName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage the dropdown
  const [adminId, setAdminId] = useState(""); // State to store admin ID for verification
  const [isVerified, setIsVerified] = useState(false); // Flag for admin verification status
  const navigate = useNavigate();

  // Fetch admin's profile based on username stored in localStorage
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      api
        .get(`${username}/admin/verifyAdmin/${username}`)
        .then((response) => {
          setAdminName(response.data.split(" ")[1]); // Extracting admin's name from response
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          setAdminName(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  // Logout function to clear localStorage and redirect
  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login"); // Redirect to login page or home
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Handle admin ID verification
  const handleAdminVerification = () => {
    const username = localStorage.getItem("username");
    if (username && adminId) {
      api
        .get(`${username}/admin/verifyAdmin/${adminId}`)
        .then((response) => {
          setIsVerified(true); // Mark as verified
        })
        .catch((error) => {
          console.error("Admin ID verification failed:", error);
          alert("Invalid Admin ID. Please try again.");
        });
    }
  };

  return (
    <div
      className={`dashboard-container ${
        !isVerified ? "blurred-background" : ""
      }`}
    >
      {/* Verification Container */}
      {!isVerified && (
        <div className="verification-container">
          <h2>Enter Admin ID to Verify</h2>
          <input
            type="text"
            placeholder="Admin ID"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
          />
          <button onClick={handleAdminVerification}>Verify</button>
        </div>
      )}

      {/* Admin Dashboard after verification */}
      {isVerified && (
        <>
          <header className="dashboard-header">
            <h1>Welcome{adminName ? `, Admin ${adminName}` : " Admin"}!</h1>
          </header>

          {isLoading ? (
            <p>Loading profile...</p>
          ) : (
            <nav className="dashboard-navbar">
              <ul>
                <li>
                  <Link to="/admin-patient">Patients</Link>
                </li>
                <li>
                  <Link to="/admin-doctor">Doctors</Link>
                </li>
                <li>
                  <Link to="/admin-appointments">Appointments</Link>
                </li>
                <li>
                  <button onClick={toggleDropdown}>
                    Stats
                    <span className="arrow">{dropdownOpen ? "▲" : "▼"}</span>
                  </button>
                  {dropdownOpen && (
                    <ul className="dropdown-menu">
                      <li>
                        <Link to="/patients-stats">Patients Stats</Link>
                      </li>
                      <li>
                        <Link to="/doctors-stats">Doctors Stats</Link>
                      </li>
                      <li>
                        <Link to="/web-stats">Website Stats</Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </nav>
          )}

          {/* Background Section Below Navbar */}
          <div className="dashboard-content">
            <h2>Welcome to the Admin Dashboard</h2>
            <div>
              Manage patients, view doctor details, track status, and much more
            </div>
            <br />
            <p>
              You can navigate through the available sections in the navbar
              above to access patient information, doctor profiles, and system
              status.
            </p>
            <p>
              If you need any assistance, feel free to reach out to the support
              team or visit the Help section.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
