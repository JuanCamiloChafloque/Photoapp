const mysql = require("mysql");
const fs = require("fs");
const ini = require("ini");

const config = require("../utils/config");

const photoapp_config = ini.parse(
  fs.readFileSync(config.photoapp_config, "utf-8")
);
const endpoint = photoapp_config.rds.endpoint;
const port_number = photoapp_config.rds.port_number;
const user_name = photoapp_config.rds.user_name;
const user_pwd = photoapp_config.rds.user_pwd;
const db_name = photoapp_config.rds.db_name;

let dbConnection = mysql.createConnection({
  host: endpoint,
  port: port_number,
  user: user_name,
  password: user_pwd,
  database: db_name,
  multipleStatements: true,
});

module.exports = dbConnection;
