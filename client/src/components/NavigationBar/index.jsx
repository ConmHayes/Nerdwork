import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';


const NavigationBar = () => {
  function clearStorage(){
    localStorage.clear()
  }
  return (
    <div className='main-container mt-5'>
      <Navbar bg="light" expand="lg" className="mb-3" fixed="top">
        <Navbar.Brand as={NavLink} to="/" style={{marginLeft:"20px"}}>
          Nerdwork
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/home" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/booksearch" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>
              Books
            </Nav.Link>
            <Nav.Link as={NavLink} to="/comicsearch" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>
              Comics
            </Nav.Link>
            <Nav.Link as={NavLink} to="/gamesearch" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>
              Games
            </Nav.Link>
            <Nav.Link as={NavLink} to="/profile" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>
              Profile
            </Nav.Link>
            <Nav.Link as={NavLink} to="/" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"} onClick={clearStorage}>
              Logout
            </Nav.Link>
            {/* Additional navigation links as needed */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default NavigationBar;
