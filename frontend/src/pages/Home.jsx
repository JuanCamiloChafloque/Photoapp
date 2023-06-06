import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Geocode from "react-geocode";
import { AiOutlineFilter, AiFillFilter } from "react-icons/ai";
import { Container, Button, Image, Form } from "react-bootstrap";

const Home = () => {
  const BUCKET_BASE_URL =
    "https://photoapp-camilochafloque.s3.us-east-2.amazonaws.com/";
  const navigate = useNavigate();

  const autoCompleteRef = useRef();
  const inputRef = useRef();

  const options = {
    componentRestrictions: { country: "us" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["establishment"],
  };

  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [filterMessage, setFilterMessage] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const profile = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    initImages();
  }, []);

  useEffect(() => {
    if (window.google) {
      console.log("sdads");
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options
      );
      autoCompleteRef.current.addListener("place_changed", async function () {
        const { address_components: place } =
          await autoCompleteRef.current.getPlace();
        let fullAddress = "";
        place.forEach((p) => {
          fullAddress += p["long_name"] + ",";
        });
        setLocation(fullAddress);
      });
    }
  }, [window.google]);

  const initImages = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + profile.token,
      },
    };
    let url = "http://localhost:8080/api/v1/images";
    if (date) url += "?date=" + date;
    if (location) {
      if (date) url += "&lat=" + latitude + "&lng=" + longitude;
      else url += "?lat=" + latitude + "&lng=" + longitude;
    }
    const { data } = await axios.get(url, config);
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
    let url = "http://localhost:8080/api/v1/images?offset=" + lastKey;
    if (date) url += "&date=" + date;
    if (location) {
      url += "&lat=" + latitude + "&lng=" + longitude;
    }

    const { data } = await axios.get(url, config);
    if (data.data.length === 0) {
      setMessage("No more images found");
      return;
    }
    setImages([...images, ...data.data]);
  };

  const handleSubmitFilters = async (e) => {
    e.preventDefault();
    setFilterMessage();
    if (!location && !date) {
      setFilterMessage("One of the filter fields is required");
      return;
    }

    if (location) {
      Geocode.fromAddress(location).then(async (response) => {
        if (response.status === "OK") {
          const result = response.results[0].geometry.location;
          setLatitude(result.lat);
          setLongitude(result.lng);
          initImages();
        } else {
          setFilterMessage("Address not found");
        }
      });
    } else {
      initImages();
    }
  };

  const handleClearFilters = () => {
    setDate("");
    setFilterMessage("");
    setLocation("");
    setMessage("");
    setTimeout(() => {
      initImages();
    }, 1000);
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
          <p className="text-muted">Show Filter Search</p>
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
            <Form onSubmit={(e) => handleSubmitFilters(e)}>
              <Form.Group className="mb-2">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Location</Form.Label>
                <Form.Control as="input" ref={inputRef} />
              </Form.Group>
              <Button variant="secondary" type="submit">
                Filter
              </Button>
              <Button
                className="ms-3"
                variant="danger"
                type="button"
                onClick={handleClearFilters}
              >
                Clear
              </Button>
            </Form>
            <Container className="text-center error-message">
              {filterMessage}
            </Container>
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
                  navigate("/discover/" + im.Key.split("/")[1], {
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
