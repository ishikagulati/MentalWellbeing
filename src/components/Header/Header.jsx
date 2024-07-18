import React from 'react';
import classes from "./Header.module.css";
import { MdLogout } from "react-icons/md";
import {
  BsFillBellFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

function Header({ sidebarHandler }) {
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    alert("User Logged Out!");
    navigate("/login");
  }

  function handleHomepageButtonClick() {
    navigate("/")
  }

  return (
    <header className={classes.header}>
      <div className={classes["menu-icon"]}>
        <BsJustify className={classes.icon} onClick={sidebarHandler} />
      </div>
      <div className={classes["header-left"]}>
        <input type="text" placeholder="Search here..." name="" value="" />
        <BsSearch className={classes.icon} />
      </div>
      <div className={classes["header-right"]}>
        <button onClick={handleHomepageButtonClick}>Go To Homepage</button>
        <BsFillBellFill className={classes.icon} title="Notifications"/>
        <BsPersonCircle className={classes.icon} title="Profile" />
        <MdLogout onClick={logout} className={classes.icon} title="Logout"/>
      </div>
    </header>
  );
}

export default Header;