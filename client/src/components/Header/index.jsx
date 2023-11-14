import React from "react";
import "animate.css";
//import "./index.css";
import { NavLink, Outlet } from "react-router-dom";

const styles = ({ isActive }) => ({ fontWeight: isActive ? "bold" : "medium" });

export default function Header() {
  function handleClick() {
    localStorage.clear();
  }
  return (
    <>
      <header>
        <nav className="navbar">
          <img src="../../../logo.png" alt="logo" />
          <NavLink className="white" to="/Home" style={styles}>
            {" "}
            Home{" "}
          </NavLink>
          <NavLink to="/Books" style={styles} className="white">
            Books{" "}
          </NavLink>
          <NavLink to="/Games" style={styles} className="white">
            Games{" "}
          </NavLink>
          <NavLink to="/Comics" style={styles} className="white">
            Comics{" "}
          </NavLink>
          <NavLink className="white" to="/Profile" style={styles}>
            Profile
          </NavLink>
          <NavLink
            className="yellow"
            to="/logout"
            style={styles}
            onClick={handleClick}
          >
            {" "}
             Logout
          </NavLink>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
