import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BsFillTrashFill } from "react-icons/bs";
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
      <h3>Your uploaded photos!</h3>
      <Container className="my-images-container">
        {images &&
          images
            .filter((im) => im.Size > 0)
            .map((im, idx) => (
              <Container key={idx} className="d-block text-center">
                <Image src={BUCKET_BASE_URL + im.Key} />
                <BsFillTrashFill
                  className="delete-icon"
                  size={28}
                  onClick={() => handleDelete(im.Key)}
                />
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
