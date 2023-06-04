import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem("profile"));

  const handleSignOut = async () => {
    localStorage.removeItem("profile");
    navigate("/login");
  };

  return (
    <Container className="mt-5">
      <h1>
        Hello! {profile.user.firstName} {profile.user.lastName}
      </h1>
      <Button variant="danger" onClick={handleSignOut}>
        Sign Out
      </Button>
    </Container>
  );
};

export default Home;
