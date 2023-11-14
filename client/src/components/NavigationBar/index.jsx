import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';


const NavigationBar = () => {
  function clearStorage(){
    localStorage.clear()
  }
  return (
    <div className='main-container mt-5'>
      <Navbar bg="light" expand="lg" className="mb-3" fixed="top">
        <Navbar.Brand as={NavLink} to="/">
          Nerdwork
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/home" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/books" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>
              Books
            </Nav.Link>
            <Nav.Link as={NavLink} to="/comic_books" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>
              Comic Books
            </Nav.Link>
            <Nav.Link as={NavLink} to="/games" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>
              Games
            </Nav.Link>
            <Nav.Link as={NavLink} to="/profile" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>
              Profile
            </Nav.Link>
            <Nav.Link as={NavLink} to="/" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"} onclick={clearStorage}>
              Logout
            </Nav.Link>
            {/* Additional navigation links as needed */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
