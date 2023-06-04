import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Container, Image } from "react-bootstrap";

const MyPhotos = () => {
  const BUCKET_BASE_URL =
    "https://photoapp-camilochafloque.s3.us-east-2.amazonaws.com/";

  const [images, setImages] = useState([]);
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
      "http://localhost:8080/api/v1/images/" + profile.user.bucketFolder,
      config
    );
    setImages(data.data);
  };

  const handleDelete = async (key) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + profile.token,
        },
      };
      const { data } = await axios.delete(
        "http://localhost:8080/api/v1/images?key=" + key,
        config
      );
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
      initImages();
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-muted m-0 p-0">
        Your uploaded photos, {profile.user.firstName}!
      </h2>
      <p className="text-muted m-0 p-0 mb-4">
        This are all the photos you've uploaded to 📸 PhotoApp and shared with
        the world!
      </p>
      <Container className="my-images-container">
        {images &&
          images.map((im, idx) => (
            <Container key={idx} className="d-block">
              <Image src={BUCKET_BASE_URL + im.bucketKey} />
              <p className="ps-2 p-0 m-0">
                <strong>Photo name:</strong> {im.assetName}
              </p>
              <p className="ps-2 p-0 m-0">
                <strong>Description:</strong> {im.description}
              </p>
              <p className="ps-2 p-0 m-0">
                <strong>Date taken:</strong>
              </p>
            </Container>
          ))}
      </Container>
      {images && images.length === 0 && (
        <Container className="w-100 text-center mb-3">
          <h5 className="text-muted">You have no images!</h5>
        </Container>
      )}
    </Container>
  );
};

export default MyPhotos;
