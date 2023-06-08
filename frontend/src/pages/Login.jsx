import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("profile");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_SERVER_URL + "api/v1/auth/login",
        { email, password }
      );
      localStorage.setItem("profile", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const validateForm = () => {
    if (!email || !password) {
      setError("All fields are required");
      return false;
    }
    return true;
  };

  return (
    <Container
      className="signin-container"
      style={{ backgroundImage: "url(./background-image.jpg)" }}
    >
      <h1 className="title-text">PhotoApp</h1>
      <h5 className="title-text">
        An app that let's you share your photos with everyone else!
      </h5>
      <Container className="form-container">
        <Form onSubmit={handleSubmit}>
          <h3 className="text-center">Log In</h3>
          <h6 className="text-center">to continue to the application</h6>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="secondary" type="submit">
            Submit
          </Button>
          <Form.Text>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </Form.Text>
          <br />
          <Form.Text className="error-message">{error}</Form.Text>
        </Form>
      </Container>
    </Container>
  );
};

export default Login;
