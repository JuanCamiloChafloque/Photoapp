import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Button, Image } from "react-bootstrap";

const Home = () => {
  const BUCKET_BASE_URL =
    "https://photoapp-camilochafloque.s3.us-east-2.amazonaws.com/";
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [message, setMessage] = useState();
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

  return (
    <Container className="mt-5">
      <h1>
        Hello! {profile.user.firstName} {profile.user.lastName}
      </h1>
      <Container className="images-container">
        {images &&
          images
            .filter((im) => im.Size > 0)
            .map((im, idx) => (
              <Image key={idx} src={BUCKET_BASE_URL + im.Key} />
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
