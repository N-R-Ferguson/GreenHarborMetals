const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const pool = require('./db');
const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

var data = {
    found: false,
};

var sendback = {
    user: "",
};


//Routes

//Login
app.post("/login", async (req, res) => {
   
    try {
        const query = 'SELECT password FROM GreenHarbor.Users WHERE email = $1';
        const user = await pool.query(query, [req.body.uuid]);

        setTimeout(function () {
            console.log("Executed after 1 second");
        }, 1000);

        if (user.rows[0].password != req.body.password) {
            data.found = true;
            res.send(data);
        } else {
            data.found = false;
            res.send(data);
        }

    } catch (err) {
        console.log(err.message);
    }
});

//Cookies

app.get('/setcookie', (req, res) => {
    res.cookie("user", "currentUser", {
        maxAge: 3600000,
    });
  
    res.send("Cookies Set");
});

app.get('/getcookie', (req, res) => {
    const user = req.cookies = req.cookies.user;

    

    sendback.user = user;
    
    res.send(sendback);
    
});

app.get('/deletecookie', (req, res) => {
    res.clearCookie("user");
});


app.listen(5000, () => {
    console.log('Server Started on port 5000');
});