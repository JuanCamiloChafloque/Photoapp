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

exports.getImagesByMetadataFilter = (date, lat, lng) => {
  return new Promise((resolve, reject) => {
    const params = [];
    let sql =
      "SELECT * FROM assets a JOIN metadata m ON a.id = m.assetId WHERE ";

    if (date && lat && lng) {
      const { minLat, maxLat, minLng, maxLng } = getCoverageAreaForCoords(
        lat,
        lng
      );
      sql +=
        "m.date = ? AND m.latitude >= ? AND m.latitude <= ? AND m.longitude >= ? AND m.longitude <= ?";
      params.push(date);
      params.push(minLat);
      params.push(maxLat);
      params.push(minLng);
      params.push(maxLng);
    } else if (date && !lat && !lng) {
      sql += "m.date = ?";
      params.push(date);
    } else if (!date && lat && lng) {
      const { minLat, maxLat, minLng, maxLng } = getCoverageAreaForCoords(
        lat,
        lng
      );
      sql +=
        "m.latitude >= ? AND m.latitude <= ? AND m.longitude >= ? AND m.longitude <= ?";
      params.push(minLat);
      params.push(maxLat);
      params.push(minLng);
      params.push(maxLng);
    }

    console.log(sql);

    dbConnection.query(sql, params, (err, results, _) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      console.log(results);
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
