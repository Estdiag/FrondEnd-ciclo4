import React from "react";
import Nav from "react-bootstrap/Nav";
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import img from "../img/logo.png";


function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/">
        <img
          alt=""
          src={img}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
      Ocho Bits LTDA
      </Navbar.Brand>
     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/laptops">Equipos</Nav.Link>
        <Nav.Link  href="/users">Usuarios</Nav.Link>
        <Nav.Link  href="/orders">Ordenes</Nav.Link>
        
      </Nav>
      <Nav>
        <Nav.Link  href="/login">Iniciar Sesión</Nav.Link>
        <Nav.Link  href="/signup">Registrate</Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default NavBar;
