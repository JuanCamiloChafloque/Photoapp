const dbConnection = require("./database");

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
