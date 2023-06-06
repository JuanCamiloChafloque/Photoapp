const dbConnection = require("./database");
const { getCoverageAreaForCoords } = require("../utils/geolocation");

exports.getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    dbConnection.query(sql, [email], (err, results, _) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    dbConnection.query(sql, [id], (err, results, _) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

exports.getImageInfoByKey = (key) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM users u JOIN assets a ON u.id = a.userId WHERE a.bucketKey = ?";
    dbConnection.query(sql, [key], (err, results, _) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

exports.getImagesByUserId = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM assets WHERE userId = ?";
    dbConnection.query(sql, [id], (err, results, _) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

exports.getImagesByMetadataFilter = (date, device, lat, lng) => {
  return new Promise((resolve, reject) => {
    const params = [];
    let sql =
      "SELECT * FROM assets a JOIN metadata m ON a.id = m.assetId WHERE";

    if (date) {
      sql += " m.date = ?";
      params.push(date);
    }

    if (device) {
      sql += " AND m.device = ?";
      params.push(device);
    }

    if (lat && lng) {
      const { minLat, maxLat, minLng, maxLng } = getCoverageAreaForCoords(
        lat,
        lng
      );
      sql += " AND m.lat >= ? AND m.lat <= ? AND m.lng >= ? AND m.lng <= ?";
      params.push(minLat);
      params.push(maxLat);
      params.push(minLng);
      params.push(maxLng);
    }

    dbConnection.query(sql, params, (err, results, _) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

exports.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users ORDER BY id ASC;";
    dbConnection.query(sql, (err, results, _) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

exports.insertUser = (email, password, lastName, firstName, bucketFolder) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO users (email, password, lastName, firstName, bucketFolder) VALUES (?, ?, ?, ?, ?)";
    dbConnection.query(
      sql,
      [email, password, lastName, firstName, bucketFolder],
      (err, results, _) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      }
    );
  });
};

exports.insertImage = (userId, assetName, description, bucketKey) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO assets (userId, assetName, description, bucketKey) VALUES (?, ?, ?, ?)";
    dbConnection.query(
      sql,
      [userId, assetName, description, bucketKey],
      (err, results, _) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      }
    );
  });
};

exports.insertImageMetadata = (assetId, device, date, lng, lat) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO metadata (assetId, device, date, longitude, latitude) VALUES (?, ?, ?, ?, ?)";
    dbConnection.query(
      sql,
      [assetId, device, date, lng, lat],
      (err, results, _) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      }
    );
  });
};

exports.updateUser = (id, email, firstName, lastName) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE users set email = ?, firstName = ?, lastName = ? WHERE id = ?";
    dbConnection.query(
      sql,
      [email, firstName, lastName, id],
      (err, results, _) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      }
    );
  });
};
