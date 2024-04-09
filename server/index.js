const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();

app.use(cors());

app.use(express.json());

//Routes

//Login
app.put("/login", async(req,res) => {
    try{
        console.log(req.params);
        // const { username, password } = req.params;
        // console.log(username, password);
        // const query = "SELECT email, password FROM GreenHarbor.Users WHERE email = $1 AND password = $2";

        // const user = await pool.query(query, [username, password]);
        // res.json(user.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

app.listen(5000, () => {
    console.log('Server Started on port 5000');
});