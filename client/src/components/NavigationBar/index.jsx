import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';


const NavigationBar = () => {
  function clearStorage(){
    localStorage.clear()
  }
  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Navbar.Brand as={NavLink} to="/">
        Nerdwork
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/home" activeclassname="nav-link-active">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/books" className={({ isActive }) => (isActive ? "nav-link-active" : "")}>
            Books
          </Nav.Link>
          <Nav.Link as={NavLink} to="/comic_books" activeclassname="nav-link-active">
            Comic Books
          </Nav.Link>
          <Nav.Link as={NavLink} to="/games" activeclassname="nav-link-active">
            Games
          </Nav.Link>
          <Nav.Link as={NavLink} to="/profile" activeclassname="nav-link-active">
            Profile
          </Nav.Link>
          <Nav.Link as={NavLink} to="/" activeclassname="nav-link-active" onClick={clearStorage}>
            Logout
          </Nav.Link>
          {/* Additional navigation links as needed */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
