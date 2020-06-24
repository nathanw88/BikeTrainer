// Set up MySQL connection.
var mysql = require("mysql");
var db_config = {
  host: process.env.RDS_HOSTNAME,
  port: process.env.RDS_PORT,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME
}

var connection;

function resetConnection () {
  connection = mysql.createConnection(db_config);

  connection.connect(function (err) {
    if (err) {
      console.log('Error When Connecting To DB:', err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  connection.on('error', function (err) {
    console.log('DB Error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      resetConnection();
    }
    else {
      throw err;
    }
  })
}

resetConnection();

// Export connection for our ORM to use 
module.exports = connection;