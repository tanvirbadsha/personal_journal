import mysql from "mysql2";

// Create a single database connection instance that can be reused
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "personal_journal",
});

// Use promises with the db connection to make async queries easier to work with
const promisePool = db.promise();

// Export the connection or promisePool to use in other files
export { promisePool };
