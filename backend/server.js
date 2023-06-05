// Final project for CS 310, Spring 2023.
//
// Authors:
//  1. Juan Camilo Chafloque Mesia
//  2. Vedant Apte
//  3. Tanay Srivastava
//
//  Northwestern University
//  Spring 2023

const express = require("express");
const path = require("path");
const cors = require("cors");
const config = require("./utils/config");

const auth = require("./routes/auth");
const images = require("./routes/images");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ strict: false, limit: "50mb" }));
app.use(cors());

app.use("/api/v1/auth", auth);
app.use("/api/v1/images", images);

app.listen(config.service_port, () => {
  console.log(`Web service running on port ${config.service_port}...`);
  process.env.AWS_SHARED_CREDENTIALS_FILE = config.photoapp_config;
});
