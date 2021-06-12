import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavSection = () => {
  return (
    <Container fluid>
      <Navbar bg="light" expand="lg">
        <Link to="/">
          <Navbar.Brand>QR code Generator</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="text-center" id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link to="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link to="/">
              <Nav.Link>Get All Data</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default NavSection;
