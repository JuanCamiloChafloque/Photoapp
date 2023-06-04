import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AiOutlineLogout, AiOutlineCloudUpload } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem("profile"));

  const handleLogout = async () => {
    localStorage.removeItem("profile");
    navigate("/login");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>📸 PhotoApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")}>Discover</Nav.Link>
            <Nav.Link onClick={() => navigate("/my-photos")}>
              My Photos
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown
              title={profile.user.firstName + " " + profile.user.lastName}
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item onClick={() => navigate("/profile")}>
                <CgProfile size={24} /> Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/upload")}>
                <AiOutlineCloudUpload size={24} /> Upload
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => handleLogout()}>
                <AiOutlineLogout size={24} /> Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
