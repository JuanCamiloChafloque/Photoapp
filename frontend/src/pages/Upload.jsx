import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Exifr from "exifr";
import moment from "moment";
import { toast } from "react-toastify";
import { BiImageAdd } from "react-icons/bi";
import axios from "axios";
import { Container, Form, Button, Image } from "react-bootstrap";

const Upload = () => {
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem("profile"));
  const [imageFile, setImageFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const encodedBytes = await encodeImage();
      const encodedData = encodedBytes.split(",")[1];
      const config = {
        headers: {
          Authorization: "Bearer " + profile.token,
        },
      };

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/images/upload",
        {
          assetName: name,
          encodedData,
          description,
          date: metadata.date,
          lat: metadata.lat,
          lng: metadata.lng,
        },
        config
      );
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
      navigate("/my-photos");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  const handleFileView = async () => {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      let files = Array.from(input.files);
      await extractMetadata(files[0]);
      setImageFile(files[0]);
      setName(files[0].name);
      const objectUrl = URL.createObjectURL(files[0]);
      setPreview(objectUrl);
    };
    input.click();
  };

  const validateForm = () => {
    if (!imageFile || !name || !description) {
      setError("All fields are required");
      return false;
    }
    return true;
  };

  const encodeImage = async () => {
    const encodePromise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
    const result = await encodePromise;
    return result;
  };

  const extractMetadata = async (imageFile) => {
    try {
      const metadata = await Exifr.parse(imageFile);
      const latitude = metadata?.latitude;
      const longitude = metadata?.longitude;
      const dateCreated = metadata?.DateTimeOriginal;
      setMetadata({
        date: dateCreated
          ? moment(dateCreated).format().substring(0, 10)
          : new Date().toISOString().substring(0, 10),
        lat: latitude || -1000,
        lng: longitude || -1000,
      });
    } catch (error) {
      console.error("Error parsing image metadata:", error);
    }
  };

  return (
    <Container className="upload-container">
      <h3 className="text-center mt-3">Upload your Photo ☁️</h3>
      <Container className="photo-container">
        <Form onSubmit={handleSubmit}>
          <Container className="mb-4 text-center">
            {imageFile ? (
              <>
                <Image
                  id="upload-photo"
                  src={preview}
                  width={250}
                  height={200}
                />
                <Button
                  variant="warning"
                  type="button"
                  className="w-50 mt-2"
                  onClick={handleFileView}
                >
                  Change File
                </Button>
              </>
            ) : (
              <>
                <BiImageAdd size={100} /> <br />
                <Button
                  variant="success"
                  type="button"
                  className="w-50 mt-2"
                  onClick={handleFileView}
                >
                  Select File
                </Button>
              </>
            )}
          </Container>
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
              as="textarea"
              value={description}
              placeholder="Enter a photo description here"
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
