const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const db = mysql.createConnection({
  host: "localhost",
  database: "formdatabase",
  user: "root",
  password: "Edition@12",
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/insert", (req, res) => {
  const FName = req.body.FName;
  const Lname = req.body.Lname;
  const email = req.body.email;
  const phone = req.body.phone;
  const address = req.body.address;
  const sqlInsert =
    "INSERT INTO form_data (FName, Lname, email, phone, address)VALUES(?,?,?,?,?)";
  db.query(sqlInsert, [FName, Lname, email, phone, address], (err, result) => {
    console.log(result);
    console.log(err);
  });
});

app.get("/", (req, res) => {
  res.send("Home Page");
});
app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM form_data";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.listen(3001, () => {
  db.connect(function (err) {
    if (err) throw err;
    console.log("server running on port 3001");
  });
});
