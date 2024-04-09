const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();

app.use(cors());

app.use(express.json());

//Routes

//Login
app.post("/login", async(req,res) => {
    try{
        const query = 'SELECT email, password FROM GreenHarbor.Users WHERE email = $1 AND password = $2';

        const user = await pool.query(query, [req.body.uuid, req.body.psw]);
        setTimeout(function(){
            console.log("Executed after 1 second");
        }, 1000);
        if (user.password != null) {
            res.end('true');
        }else{ 
            res.end('false');
        }
        
    } catch (err) {
        console.log(err.message);
    }
});

app.listen(5000, () => {
    console.log('Server Started on port 5000');
});