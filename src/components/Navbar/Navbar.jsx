import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaRegCircleUser } from "react-icons/fa6";
import swal from "sweetalert";
import Logo from "../../assets/logo.png";

const Navbar = ({ isHomePage }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function logout() {
    localStorage.clear();
    swal({
      title: "User Logged out",
      icon: "success",
    });
    window.location.reload();
  }

  function goToDash() {
    navigate("/dashboard");
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className={`navbar ${isHomePage ? "homepage-navbar" : ""}`}>
      <div className="navLeft">
        <img src={Logo} width={60} />
        <Link
          to="/"
          className={`${isHomePage ? "homepage-title" : "navTitle"}`}
        >
          MindWell
        </Link>
      </div>
      <div className={`${isHomePage ? "homepage-navCenter" : "navCenter"}`}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/categories">Take A Test</NavLink>
          </li>
          <li>
            <NavLink to="/get-counselling">Get Counselling</NavLink>
          </li>
          <li>
            <NavLink onClick={toggleDropdown}>Resources</NavLink>
          </li>
          {isDropdownOpen && (
            <div
              className={`${
                isHomePage ? "homepage-navdropdown" : "navdropdown"
              }`}
            >
              <NavLink to="/resources">Worksheets</NavLink>
              <NavLink to="/blogs">Blogs</NavLink>
            </div>
          )}
          <li>
            <NavLink to="/community">Community</NavLink>
          </li>
        </ul>
      </div>
      {localStorage.getItem("token") !== null ? (
        <div className={`${isHomePage ? "homepage-navRight" : "navRight"}`}>
          <ul className="greetLogout">
            <li
              title="Go To Dashboard"
              className={`${isHomePage ? "homepage-dashIcon" : "dashIcon"}`}
              onClick={goToDash}
            >
              <FaRegCircleUser size={20} />
            </li>
            <li className={`${isHomePage ? "homepage-greeting" : "greeting"}`}>
              Hello, {localStorage.getItem("name")}
            </li>
          </ul>
          <div
            className={`${isHomePage ? "homepage-logout" : "logout"}`}
            onClick={logout}
          >
            Logout
          </div>
        </div>
      ) : (
        <div className={`${isHomePage ? "homepage-navRight" : "navRight"}`}>
          <ul
            className={`${isHomePage ? "homepage-loginSignup" : "loginSignup"}`}
          >
            <li>
              <NavLink to="/login">Log In</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;