import { createConnection } from "mysql2";

export function createdbConnection() {
  var con = createConnection({
    host: "localhost",
    user: "root",
    password: "cdac",
    database: "demo_db", /// Database name
  });
  con.connect((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Database Connected Successfully!!!");
    }
  });
  return con;
}
