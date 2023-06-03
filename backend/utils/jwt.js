const jwt = require("jsonwebtoken");

exports.createJWT = (id) => {
  return jwt.sign({ id: id }, "CS310_JWT_SECRET_KEY", {
    expiresIn: "7d",
  });
};
