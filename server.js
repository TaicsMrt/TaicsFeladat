const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    port: '3306',
    password: '',
    database: 'atletikavb2017'
});

db.connect((err) => {
    if (err) {
        console.log('Csatlakozási hiba az adatbázishoz');
    } else {
        console.log('Sikeres csatlakozás az adatbázishoz');
    }
});

app.get('/', (req, res) => {
    res.send('Működik a szerver');
});

app.listen(3000, () => {
    console.log('Fut a szerver!');
});

// 1. feladat:
app.get('/versenyek-több-mint-60-perc', (req, res) => {
    const query = `SELECT VersenySzam FROM versenyekszamok WHERE (SUBSTRING_INDEX(Eredmeny, ':', 1) * 60 + SUBSTRING_INDEX(Eredmeny, ':', -1)) / 60 > 60 GROUP BY VersenySzam;`;
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Hiba a lekérdezés során');
        } else {
            res.json(results);
        }
    });
});

// 2. feladat: 
app.post('/nemzet-hozzaadas', (req, res) => {
    const { Nemzet } = req.body;
    const query = 'INSERT INTO nemzetek (Nemzet) VALUES (?)';
    db.query(query, [Nemzet], (err, result) => {
        if (err) {
            res.status(500).send('Hiba a nemzet hozzáadása során');
        } else {
            res.status(201).send('Nemzet sikeresen hozzáadva');
        }
    });
});

// 3. feladat: 


// 4. feladat: 