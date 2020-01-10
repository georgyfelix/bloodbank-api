const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

// parse application/json
app.use(bodyParser.json());

//create database connection
const conn = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'ylIq3QwqEr',
    password: 'vd3QfUnxLX',
    database: 'ylIq3QwqEr',
    port: 3306
});

conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
});

app.listen(3000, () => {
    console.log('Server started on port 3000...');
});


app.post('/api/RegisterNewUser', (req, res) => {
    let data = { 
        first_name: req.body.first_name, 
        last_name: req.body.last_name,
        middle_name: req.body.middle_name,
        phone_no: req.body.phone_no,
        email_id: req.body.email_id,
        blood_group: req.body.blood_group
    };
    let sql = "INSERT INTO USER_MSTR (FIRST_NAME, LAST_NAME, MIDDLE_NAME, PHONE_NO, EMAIL_ID, BLOOD_GROUP) VALUES('" + data.first_name + "','" + data.last_name + "','" + data.middle_name + "','" + data.phone_no + "','" + data.email_id + "', '" + data.blood_group +"')";
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});
