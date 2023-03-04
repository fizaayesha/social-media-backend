import mysql from "mysql";
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ayesha#786",
  database:"Social_Media"
});
