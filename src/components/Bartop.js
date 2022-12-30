import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoText from "../assets/img/logo_pnnl_white_cropped_text.png";
import logo from "../assets/img/logo_pnnl_white_cropped.png";

export const Bartop = () => {

  return (
    <Navbar fixed="top" bg="dark" variant="dark" expand="lg" className="bartop">
      <Container>
        <Navbar.Brand href="#home"> 
        <img className = "logo-text" src={logoText} alt="Logo" />
        <img className = "logo" src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Dashboard</Nav.Link>
            <Nav.Link href="#link">Impacts</Nav.Link>
            <NavDropdown title="Explore" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
