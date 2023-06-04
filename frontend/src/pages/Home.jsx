import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineFilter, AiFillFilter } from "react-icons/ai";
import { Container, Button, Image, Form } from "react-bootstrap";

const Home = () => {
  const BUCKET_BASE_URL =
    "https://photoapp-camilochafloque.s3.us-east-2.amazonaws.com/";
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [message, setMessage] = useState();
  const [showFilter, setShowFilter] = useState(false);
  const profile = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    initImages();
  }, []);

  const initImages = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + profile.token,
      },
    };
    const { data } = await axios.get(
      "http://localhost:8080/api/v1/images",
      config
    );
    setImages(data.data);
  };

  const getMoreImages = async () => {
    setMessage("");
    const config = {
      headers: {
        Authorization: "Bearer " + profile.token,
      },
    };
    const lastKey = images.slice(-1)[0].Key;
    const { data } = await axios.get(
      "http://localhost:8080/api/v1/images?offset=" + lastKey,
      config
    );
    if (data.data.length === 0) {
      setMessage("No more images found");
      return;
    }
    setImages([...images, ...data.data]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container className="mt-5">
      <h2 className="text-muted m-0 p-0">
        Welcome to 📸 PhotoApp, {profile.user.firstName}!
      </h2>
      <p className="text-muted m-0 p-0 mb-4">
        Browse through your feed and discover the coolest photos shared by the
        world!
      </p>
      {!showFilter && (
        <Container className="d-flex">
          <AiOutlineFilter
            className="filter-icon mb-3"
            size={28}
            onClick={() => setShowFilter((prev) => !prev)}
          />
          <p className="text-muted"> Show Filter Search</p>
        </Container>
      )}
      {showFilter && (
        <>
          <hr />
          <Container className="d-flex">
            <AiFillFilter
              className="filter-icon mb-3"
              size={28}
              onClick={() => setShowFilter((prev) => !prev)}
            />
            <p className="text-muted"> Hide Filter Search</p>
          </Container>
          <Container className="filter-container">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Button variant="secondary" type="submit">
                Filter
              </Button>
            </Form>
          </Container>
          <hr />
        </>
      )}
      <Container className="images-container">
        {images &&
          images
            .filter((im) => im.Size > 0)
            .map((im, idx) => (
              <Image
                key={idx}
                src={BUCKET_BASE_URL + im.Key}
                onClick={() =>
                  navigate("/photos/" + im.Key.split("/")[1], {
                    state: { key: im.Key },
                  })
                }
              />
            ))}
      </Container>
      <Container className="w-100 text-center mb-3">
        {message ? (
          <h5 className="text-muted">{message}</h5>
        ) : (
          <Button variant="secondary" onClick={getMoreImages}>
            Load More
          </Button>
        )}
      </Container>
    </Container>
  );
};

export default Home;
