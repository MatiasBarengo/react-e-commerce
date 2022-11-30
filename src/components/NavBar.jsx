import React, { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import CartBar from './CartBar';

const NavBar = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="primary" expand="lg" className='navbar-dark'>
        <Container>
          <Navbar.Brand as={Link} to='/'>"Matias Barengo" E-Commerce App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to='/login' style={{margin: '0 2rem'}}><i class="fa-solid fa-user"></i></Nav.Link>
              <Nav.Link as={Link} to='/purchases' style={{margin: '0 2rem'}}><i class="fa-solid fa-box-archive"></i></Nav.Link>
              <Nav.Link onClick={handleShow} style={{margin: '0 2rem'}}><i className="fa-solid fa-cart-shopping"></i></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CartBar show={show} handleClose={handleClose}/>
    </>
  );
};

export default NavBar;