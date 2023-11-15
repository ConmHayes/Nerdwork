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
          <NavLink className="white" to="/Home" style={styles}>
            {" "}
            Home{" "}
          </NavLink>
          <NavLink to="/BookSearch" style={styles} className="white">
            Books{" "}
          </NavLink>
          <NavLink to="/GameSearch" style={styles} className="white">
            Games{" "}
          </NavLink>
          <NavLink to="/ComicSearch" style={styles} className="white">
            Comics{" "}
          </NavLink>
          <NavLink className="white" to="/Profile" style={styles}>
            Profile
          </NavLink>
          <NavLink
            className="yellow"
            to="/"
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
