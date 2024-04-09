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


// Routes

// Login
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

// Register
app.post("/register", async (req,res) => {
    try {
        console.log(req.body);
        const temp = req.body.uuid.split("@");
        let username = temp[0];
        let emailEnd = temp[1];
        let supplier = req.body.supplier;
        let query = "";
      
        if (emailEnd == 'ghm.org'){
            //Insert into user table
            query = "INSERT INTO GreenHarbor.Users (CompanyID, UserName, Email, Password, FirstName, LastName) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT(Email) DO NOTHING";
            await pool.query(query, [1,username, req.body.uuid, req.body.psw, req.body.firstname, req.body.lastname]);
            console.log("User inserted");

            // Select the userid
            query = "SELECT userid FROM GreenHarbor.Users WHERE email=$1"
            let result = await pool.query(query, [req.body.uuid]);

            //Insert into staff table
            query = "INSERT INTO GreenHarbor.Staff (PositionTypeID, UserID, FirstName, LastName) VALUES ($1,$2,$3,$4) ON CONFLICT(UserID) DO NOTHING";
            await pool.query(query, [1, result.rows[0].userid, req.body.firstname, req.body.lastname]);
            console.log("Staff Member inserted");
        }else if (supplier = 'yes'){
            //Insert new company
            query = "INSERT INTO GreenHarbor.Company (CompanyTypeID, Name, StreetAddress, City, State, Zipcode) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT(Name) DO NOTHING"
            await pool.query(query, [2, req.body.supplierName,'n','n','n','n']);
            console.log('Company Inserted')

            //Select companyid from company table
            query = "SELECT companyID FROM GreenHarbor.Company WHERE name=$1";
            let result = await pool.query(query, [req.body.supplierName]);
            //Insert user into user table
            query = "INSERT INTO GreenHarbor.Users (CompanyID, UserName, Email, Password, FirstName, LastName) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT(Email) DO NOTHING";
            await pool.query(query, [result.rows[0].companyid, username, req.body.uuid, req.body.psw, req.body.firstname, req.body.lastname]);
            console.log("User inserted");
        }else{
            query = "INSERT INTO GreenHarbor.Users (CompanyID, UserName, Email, Password, FirstName, LastName) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT(Email) DO NOTHING";
            await pool.query(query, [3,username, req.body.uuid, req.body.psw, req.body.firstname, req.body.lastname]);
            console.log("User inserted");

         
        }


    } catch (err) {
        console.log(err.message);
    }
});


app.listen(5000, () => {
    console.log('Server Started on port 5000');
});