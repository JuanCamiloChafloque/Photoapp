const dbConnection = require("../db/database");

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
