import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Geocode from "react-geocode";
import { AiOutlineFilter } from "react-icons/ai";
import { Container, Button, Image } from "react-bootstrap";
import FilterForm from "../components/FilterForm";

const Home = () => {
  const BUCKET_BASE_URL =
    "https://photoapp-camilochafloque.s3.us-east-2.amazonaws.com/";
  const navigate = useNavigate();

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

  const initImages = async (date = null, lat = null, lng = null) => {
    setMessage("");
    const config = {
      headers: {
        Authorization: "Bearer " + profile.token,
      },
    };
    let url =
      "http://photoapp-service-env.eba-ywmaufi5.us-east-2.elasticbeanstalk.com/api/v1/images?offset=start";
    if (date) url += "&date=" + date;
    if (lat && lng) {
      url += "&lat=" + lat + "&lng=" + lng;
    }
    const { data } = await axios.get(url, config);
    setImages(data.data);
    if (data.data.length === 0) {
      setMessage("No results found for your search");
    }

    if (date === null) setDate("");
    if (lat === null && lng === null) setLocation("");
    else {
      setLatitude(lat);
      setLongitude(lng);
    }
  };

  const getMoreImages = async () => {
    setMessage("");
    const config = {
      headers: {
        Authorization: "Bearer " + profile.token,
      },
    };

    const lastKey = images.slice(-1)[0].Key;
    let url =
      "http://photoapp-service-env.eba-ywmaufi5.us-east-2.elasticbeanstalk.com/api/v1/images?offset=" +
      lastKey;
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
          initImages(date, result.lat, result.lng);
        } else {
          setFilterMessage("Address not found");
        }
      });
    } else {
      initImages(date, null, null);
    }
  };

  const handleClearFilters = () => {
    initImages(null, null, null);
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
        <FilterForm
          setShowFilter={setShowFilter}
          setDate={setDate}
          date={date}
          setLocation={setLocation}
          location={location}
          handleSubmitFilters={handleSubmitFilters}
          handleClearFilters={handleClearFilters}
          filterMessage={filterMessage}
        />
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
