import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { removetoken } from "../services/adminservices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function Navigation() {
  const navigate = useNavigate();
  const handlelogout = () => {
    removetoken();
    navigate("/");
    toast.error("Logged Out Successfully!!!");
  };

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/dashboard">Student App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/dashboard">
              <Nav.Link>DashBoard</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register-student">
              <Nav.Link>Register Student</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/studentslist">
              <Nav.Link>Students List</Nav.Link>
            </LinkContainer>
          </Nav>
          <Button variant="success" onClick={handlelogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
