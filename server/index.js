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
app.post("/register", async (req, res) => {
    try {

        const temp = req.body.uuid.split("@");
        let username = temp[0];
        let emailEnd = temp[1];
        let supplier = req.body.supplier;
        let query = "";

        console.log(emailEnd);

        if (emailEnd == 'ghm.org') {
            //Insert into user table
            query = "SELECT companyid FROM GreenHarbor.Company WHERE name=$1"
            let result = await pool.query(query, ['Green Harbor']);
            const ghid = result.rows[0].companyid;

            query = "INSERT INTO GreenHarbor.Users (CompanyID, UserName, Email, Password, FirstName, LastName) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT(Email) DO NOTHING";
            await pool.query(query, [ghid, username, req.body.uuid, req.body.psw, req.body.firstname, req.body.lastname]);
            console.log("User inserted");

            // Select the userid
            query = "SELECT userid FROM GreenHarbor.Users WHERE email=$1"
            result = await pool.query(query, [req.body.uuid]);

            //Insert into staff table
            query = "INSERT INTO GreenHarbor.Staff (PositionTypeID, UserID, FirstName, LastName) VALUES ($1,$2,$3,$4) ON CONFLICT(UserID) DO NOTHING";
            await pool.query(query, [1, result.rows[0].userid, req.body.firstname, req.body.lastname]);
            console.log("Staff Member inserted");
        } else if (supplier == 'yes') {
            //Insert new company
            console.log(req.body);
            query = "INSERT INTO GreenHarbor.Company (CompanyTypeID, Name, StreetAddress, City, State, Zipcode) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT(Name) DO NOTHING"
            await pool.query(query, [2, req.body.supplierName, req.body.street, req.body.city, req.body.state, req.body.zip]);
            console.log('Company Inserted')

            //Select companyid from company table
            query = "SELECT companyID FROM GreenHarbor.Company WHERE name=$1";
            let result = await pool.query(query, [req.body.supplierName]);
            //Insert user into user table
            query = "INSERT INTO GreenHarbor.Users (CompanyID, UserName, Email, Password, FirstName, LastName) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT(Email) DO NOTHING";
            await pool.query(query, [result.rows[0].companyid, username, req.body.uuid, req.body.psw, req.body.firstname, req.body.lastname]);
            console.log("User inserted");
        } else {
            query = "INSERT INTO GreenHarbor.Company (CompanyTypeID, Name, StreetAddress, City, State, Zipcode) VALUES ($1,$2,$3,$4,$5,$6) RETURNING companyid";
            result = await pool.query(query, [1, req.body.uuid, 'n', 'n', 'n', 'n']);
            const customer = result.rows[0].companyid;

            query = "INSERT INTO GreenHarbor.Users (CompanyID, UserName, Email, Password, FirstName, LastName) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT(Email) DO NOTHING";
            await pool.query(query, [customer, username, req.body.uuid, req.body.psw, req.body.firstname, req.body.lastname]);
            console.log("User inserted");
        }

        res.send('Done');
    } catch (err) {
        console.log(err.message);
    }
});

// Account Info
app.post('/accountinfo', async (req, res) => {
    try {
        let query = "SELECT c1.companytypeid FROM GreenHarbor.Users u INNER JOIN GreenHarbor.Company c1 ON  u.companyid=c1.companyid WHERE u.email=$1";
        let response = await pool.query(query, [req.body.user]);
        let id = response.rows[0].companytypeid;

        if (id == 3) {
            query = "SELECT u.userid, u.firstname, u.lastname, c1.companytypeid, p1.name FROM GreenHarbor.Users u INNER JOIN GreenHarbor.Staff s ON u.userid=s.userid INNER JOIN GreenHarbor.Company c1 ON u.companyid=c1.companyid INNER JOIN GreenHarbor.PositionType p1 ON s.positiontypeid=p1.positiontypeid WHERE email=$1";
            response = await pool.query(query, [req.body.user]);
        } else if (id == 2) {
            query = "SELECT GreenHarbor.Users.userid, GreenHarbor.Users.firstname, GreenHarbor.Users.lastname, GreenHarbor.Company.companytypeid, GreenHarbor.Company.Name, GreenHarbor.Company.StreetAddress, GreenHarbor.Company.City, GreenHarbor.Company.State, GreenHarbor.Company.ZipCode FROM GreenHarbor.Users INNER JOIN GreenHarbor.Company ON GreenHarbor.Users.companyid=GreenHarbor.Company.companyid and GreenHarbor.Users.email=$1";
            response = await pool.query(query, [req.body.user]);
            console.log(response.rows[0]);
        } else {
            query = "SELECT GreenHarbor.Users.userid, GreenHarbor.Users.firstname, GreenHarbor.Users.lastname, GreenHarbor.Company.companytypeid FROM GreenHarbor.Users INNER JOIN GreenHarbor.Company ON GreenHarbor.Users.companyid=GreenHarbor.Company.companyid WHERE email=$1";
            response = await pool.query(query, [req.body.user]);
        }
        res.json(response.rows[0]);

    } catch (err) {
        console.log(err.message);
    }
});

// Add Metals
app.post('/add-metal', async (req, res) => {
    try {
        //Get siloh id for metal type
        let query = "SELECT s.silohid FROM GreenHarbor.Siloh s WHERE s.name=$1";
        let response = await pool.query(query, [req.body.metaltype]);
        const silohid = response.rows[0].silohid;

        query = "SELECT c1.companyid FROM GreenHarbor.Company c1 WHERE c1.name=$1";
        response = await pool.query(query, [req.body.name]);
        const companyID = response.rows[0].companyid;

        query = "INSERT INTO GreenHarbor.Metals (CompanyID, MetalType, Weight) VALUES ($1, $2, $3) RETURNING MetalsID";
        response = await pool.query(query, [companyID, req.body.metaltype, req.body.weight]);
        const metalid = response.rows[0].metalsid;

        const date = new Date();
        const today = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
        const mined = req.body.month + '/' + req.body.day + '/' + req.body.year;

        query = "INSERT INTO GreenHarbor.Inventory (MetalsID, SilohID, Amount, DateMined, InventoryDate) VALUES ($1, $2, $3, $4, $5)"
        response = await pool.query(query, [metalid, silohid, req.body.weight, mined, today]);
    } catch (err) {
        console.log(err.message);
    }
    res.send('Metal Added');
});

app.get('/products', async (req, res) => {
    try {
        const query = "SELECT row_number() OVER (ORDER BY a.companyid), a.name AS company_name, s.name as siloh_name, sum(m1.weight) FROM GreenHarbor.Metals m1 INNER JOIN GreenHarbor.Siloh s ON m1.metaltype = s.name INNER JOIN GreenHarbor.Company a ON a.companyid=m1.companyid WHERE m1.weight<>$1 GROUP BY a.companyid, s.silohid ORDER BY s.name ASC, a.name ASC, row_number() OVER (ORDER BY s.name) ASC";
        const response = await pool.query(query, [0]);
        res.send(response.rows);
    } catch (err) {
        console.log(err.message);
    }

})

app.post('/get-products', async (req, res) => {
    try {
        const query = "SELECT row_number() OVER (ORDER BY i.inventoryid), i.amount, i.datemined, i.inventorydate FROM GreenHarbor.Metals m1 INNER JOIN GreenHarbor.Inventory i ON m1.metalsid=i.metalsid INNER JOIN GreenHarbor.Company c1 ON m1.companyid=c1.companyid WHERE c1.name=$1 AND m1.metaltype=$2 AND m1.weight<>$3"
        const response = await pool.query(query, [req.body.c_name, req.body.m_name, 0]);
        res.send(response.rows);
    } catch (err) {
        console.log(err.message);
    }
});

app.post('/add-to-cart', async (req, res) => {
    // Retrieve CompanyID of current company 
    try {
        let query = "SELECT c1.companyid FROM GreenHarbor.Company c1 WHERE c1.name=$1";
        let response = await pool.query(query, [req.body.buyer]);
        const buyerid = response.rows[0].companyid;

        query = "SELECT c1.companyid FROM GreenHarbor.Company c1 WHERE c1.name=$1";
        response = await pool.query(query, [req.body.company]);
        const companyid = response.rows[0].companyid;

        // // Find if there is an order already in the Orders Table for companyid
        query = "SELECT o.orderid FROM GreenHarbor.Orders o WHERE o.companyid=$1";
        response = await pool.query(query, [buyerid]);

        if (response.rows[0] == null) { // If Not then add an order for that company to Orders Table and return orderid
            const date = new Date();
            const today = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
            query = "INSERT INTO GreenHarbor.Orders (CompanyID, OrderTypeID, DateOrdered) VALUES ($1, $2, $3)  RETURNING OrderID";
            response = await pool.query(query, [buyerid, 2, today]);
            console.log("Order created");
        }
        const orderid = response.rows[0].orderid;

        query = "SELECT m1.metalsid FROM GreenHarbor.Metals m1 WHERE m1.metaltype=$1 AND m1.companyid=$2";
        response = await pool.query(query, [req.body.metal, companyid]);
        metalsid = response.rows[0].metalsid;

        query = "INSERT INTO GreenHarbor.OrderCart (OrderID, MetalsID, UnitPrice, Quantity) VALUES($1, $2, $3, $4)";
        response = await pool.query(query, [orderid, metalsid, req.body.price, req.body.amount]);
        console.log("Order added to cart");

        query = "UPDATE GreenHarbor.Inventory SET amount=$1 WHERE metalsid=$2";
        response = await pool.query(query, [0, metalsid]);

        query = "UPDATE GreenHarbor.Metals SET weight=$1 WHERE metalsid=$2";
        response = await pool.query(query, [0, metalsid]);
    } catch (err) {
        console.log(err.message);
    }
});

app.post('/get-cart', async (req, res) => {
    try {
        let query = "SELECT o.orderid FROM GreenHarbor.Orders o INNER JOIN GreenHarbor.Company c ON o.companyid=c.companyid WHERE c.name=$1";
        let response = await pool.query(query, [req.body.name]);
        const orderid = response.rows[0].orderid;

        query = "SELECT * FROM GreenHarbor.OrderCartView WHERE orderid=$1";
        response = await pool.query(query, [orderid]);
        res.send(response.rows);
    } catch (err) {
        console.log(err.message);
    }
    
});

app.post('/get-order-cost', async (req, res) => {
    try {
        let query = "SELECT o.orderid FROM GreenHarbor.Orders o INNER JOIN GreenHarbor.Company c ON o.companyid=c.companyid WHERE c.name=$1";
        let response = await pool.query(query, [req.body.name]);
        const orderid = response.rows[0].orderid;

        query = "SELECT * FROM GreenHarbor.OrderTotalView WHERE orderid=$1";
        response = await pool.query(query, [orderid]);
        res.send(response.rows);
    } catch (err) {
        console.log(err.message);
    } 
});

app.post('/sales-order', async (req,res) =>{
    let query = "SELECT o.orderid FROM GreenHarbor.Orders o INNER JOIN GreenHarbor.Company c ON o.companyid=c.companyid WHERE c.name=$1";
    let response = await pool.query(query, [req.body.name]);
    const orderid = response.rows[0].orderid;

    query = "INSERT INTO GreenHarbor.SalesOrder (OrderID, ShipToStreet, ShipToCity, ShipToState, ShipToZip) VALUES ($1, $2, $3, $4, $5)";
    response = await pool.query(query, [orderid, req.body.address, req.body.city, req.body.state, req.body.zip]);   
});

app.get('/get-orders', async (req, res) => {
    try{
        const query = "SELECT * FROM GreenHarb";
    }catch (err){
        console.log(err.message);
    }
});

app.listen(5000, () => {
    console.log('Server Started on port 5000');
});