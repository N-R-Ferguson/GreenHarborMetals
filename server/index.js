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

let sendback = "";



// Routes

// Login
app.post("/login", async (req, res) => {
   
    try {
        const query = 'SELECT password FROM GreenHarbor.Users WHERE email = $1';
        const user = await pool.query(query, [req.body.uuid]);

        setTimeout(function () {
            console.log("Executed after 1 second");
        }, 1000);

        if (user.rows[0].password == req.body.psw) {
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
            console.log('Staff');
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
        }else if (supplier == 'yes'){
            console.log('Supplier');
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
            console.log('Customer');
            query = "INSERT INTO GreenHarbor.Users (CompanyID, UserName, Email, Password, FirstName, LastName) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT(Email) DO NOTHING";
            await pool.query(query, [3,username, req.body.uuid, req.body.psw, req.body.firstname, req.body.lastname]);
            console.log("User inserted");
        }

        res.send('Done');
    } catch (err) {
        console.log(err.message);
    }
});

// Account Info
app.post('/accountinfo', async(req, res) => {

    
    try{
        let query = "SELECT GreenHarbor.Users.companyid FROM GreenHarbor.Users WHERE GreenHarbor.Users.email=$1";
        let response = await pool.query(query, [req.body.user]);
        let id = response.rows[0].companyid;
        
        if (id == 1){
            query = "SELECT GreenHarbor.Users.firstname, GreenHarbor.Users.lastname, GreenHarbor.Staff.positiontypeid, GreenHarbor.Company.companytypeid FROM GreenHarbor.Users INNER JOIN GreenHarbor.Staff ON GreenHarbor.Users.userid=GreenHarbor.Staff.userid INNER JOIN GreenHarbor.Company ON GreenHarbor.Users.companyid=GreenHarbor.Company.companyid WHERE email=$1";
            response = await pool.query(query, [req.body.user]);
        
        }else if (id == 2){
            query = "SELECT GreenHarbor.Users.firstname, GreenHarbor.Users.lastname, GreenHarbor.Company.companytypeid, GreenHarbor.Company.Name, GreenHarbor.Company.StreetAddress, GreenHarbor.Company.City, GreenHarbor.Company.State, GreenHarbor.Company.ZipCode FROM GreenHarbor.Users INNER JOIN GreenHarbor.Company ON GreenHarbor.Users.companyid=GreenHarbor.Company.companyid and GreenHarbor.Users.email=$1";
            response = await pool.query(query, [req.body.user]);
        } else {
            query = "SELECT GreenHarbor.Users.firstname, GreenHarbor.Users.lastname, GreenHarbor.Company.companytypeid FROM GreenHarbor.Users INNER JOIN GreenHarbor.Company ON GreenHarbor.Users.companyid=GreenHarbor.Company.companyid WHERE email=$1";
            response = await pool.query(query, [req.body.user]);
        }   
        res.send(response.rows[0]);

    } catch (err) {
        console.log(err.message);
    }
});

// Update Account Info


app.listen(5000, () => {
    console.log('Server Started on port 5000');
});