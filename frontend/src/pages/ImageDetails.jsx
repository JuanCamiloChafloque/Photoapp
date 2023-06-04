import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ImageDetails = () => {
  const profile = JSON.parse(localStorage.getItem("profile"));
  const location = useLocation();

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
    console.log(data);
  };

  return <div></div>;
};

export default ImageDetails;
