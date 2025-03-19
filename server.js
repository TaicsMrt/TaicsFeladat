const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    port: "3306",
    password: "",
    database: "felveteli"
});

db.connect((err) => {
    console.log('Csatlakozva az adatbázishoz');
});

app.get("/", (req, res) => {
    res.send("Működik a szerverem!");
});

app.listen(3000, () => {
    console.log('Fut a szerver!');
});