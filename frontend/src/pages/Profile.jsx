import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Col, Row } from "react-bootstrap";

const Profile = () => {
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem("profile"));

  const [firstName, setFirstName] = useState(profile.user.firstName);
  const [lastName, setLastName] = useState(profile.user.lastName);
  const [email, setEmail] = useState(profile.user.email);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + profile.token,
        },
      };
      const { data } = await axios.put(
        "http://photoapp-service-env.eba-ywmaufi5.us-east-2.elasticbeanstalk.com/api/v1/auth/update",
        { email, firstName, lastName },
        config
      );
      localStorage.setItem("profile", JSON.stringify(data));
      toast.success("Profile updated successfully", {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  const validateForm = () => {
    if (!firstName || !lastName || !email) {
      setError("All fields are required");
      return false;
    }
    return true;
  };

  return (
    <Container className="profile-container">
      <Container className="update-container">
        <Form onSubmit={handleSubmit}>
          <h3 className="text-center">Profile</h3>
          <h6 className="text-center">update your profile's information ✏️</h6>
          <Row md={2}>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Button variant="secondary" type="submit">
            Update Profile
          </Button>
          <br />
          <Form.Text className="error-message">{error}</Form.Text>
        </Form>
      </Container>
    </Container>
  );
};

export default Profile;
