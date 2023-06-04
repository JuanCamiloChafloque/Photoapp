import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

const Upload = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        { email, password, firstName, lastName }
      );
      localStorage.setItem("profile", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  const handleFileView = () => {};

  const validateForm = () => {
    if (!image || !name || !description) {
      setError("All fields are required");
      return false;
    }
    return true;
  };

  return (
    <Container className="upload-container">
      <h3 className="text-center mt-3">Upload your Photo ☁️</h3>
      <Container className="photo-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Image name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Button variant="secondary" type="submit">
            Upload
          </Button>
          <br />
          <Form.Text className="error-message">{error}</Form.Text>
        </Form>
      </Container>
    </Container>
  );
};

export default Upload;
