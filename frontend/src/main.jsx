import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles/styles.css";
import "./styles/auth.css";
import "./styles/upload.css";
import "./styles/home.css";
import "./styles/my-photos.css";
import "./styles/profile.css";
import "./styles/details.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
