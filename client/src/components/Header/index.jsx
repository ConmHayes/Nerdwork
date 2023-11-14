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
          <NavLink to="/books" style={styles} className="white">
            Profile{" "}
          </NavLink>
          <NavLink className="white" to="/games" style={styles}>
            Games
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
