import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { Container, Image } from "react-bootstrap";

const ImageDetails = () => {
  const BUCKET_BASE_URL =
    "https://photoapp-camilochafloque.s3.us-east-2.amazonaws.com/";
  const profile = JSON.parse(localStorage.getItem("profile"));
  const location = useLocation();
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    getImageDetails();
  }, []);

  const getImageDetails = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + profile.token,
      },
    };
    const key = location.state.key;
    const { data } = await axios.get(
      "http://localhost:8080/api/v1/images/details?key=" + key,
      config
    );
    setImageData(data.result);
  };

  if (!imageData) return null;

  return (
    <Container className="details-container">
      <Container className="details-image">
        <Image src={BUCKET_BASE_URL + imageData.bucketKey} />
      </Container>
      <Container className="details-info">
        <h1>
          <strong>Photo name:</strong> {imageData.assetName.split(".")[0]}
        </h1>
        <h1>
          <strong>Description:</strong> {imageData.description}
        </h1>
        <br />
        <h4 className="text-muted">
          {" "}
          🗓️ Taken on: {moment(imageData.date).format("MMMM Do YYYY")}
        </h4>
        <h4 className="text-muted">
          ✅ Posted by: {imageData.firstName} {imageData.lastName}
        </h4>
        <h4 className="text-muted">📧 Contact: {imageData.email}</h4>
      </Container>
    </Container>
  );
};

export default ImageDetails;
