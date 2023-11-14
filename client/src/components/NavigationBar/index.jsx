import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Navbar.Brand as={NavLink} to="/">
        Nerdwork
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} exact to="/home" activeClassName="nav-link-active">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/books" className={({ isActive }) => (isActive ? "nav-link-active" : "")}>
            Books
          </Nav.Link>
          <Nav.Link as={NavLink} to="/comic_books" activeClassName="nav-link-active">
            Comic Books
          </Nav.Link>
          <Nav.Link as={NavLink} to="/games" activeClassName="nav-link-active">
            Games
          </Nav.Link>
          <Nav.Link as={NavLink} to="/profile" activeClassName="nav-link-active">
            Profile
          </Nav.Link>
          <Nav.Link as={NavLink} to="/" activeClassName="nav-link-active">
            Logout
          </Nav.Link>
          {/* Additional navigation links as needed */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
