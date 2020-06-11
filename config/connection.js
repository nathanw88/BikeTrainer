// Set up MySQL connection.
var mysql = require("mysql");

var connection;
if (process.env.RDS_HOSTNAME) {
    connection = mysql.createConnection({
      host: process.env.RDS_HOSTNAME,
      port: process.env.RDS_PORT,
      user: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      database: process.env.RDS_DB_NAME
  });
} else {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3307,
        user: "root",
        password: "root",
        database: "trainer_db"
    });
}

// Make connection
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use 
module.exports = connection;