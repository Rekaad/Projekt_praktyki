const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Pocohaslo1",
    host: "localhost",
    port: 5432,
    database: "testowa1"
});

module.exports = pool;