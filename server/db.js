const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password:"R3turn",
    host:"localhost",
    port:"5432",
    database:"GreenHarborMetals",
});

module.exports = pool;