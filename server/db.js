const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Pocohaslo1",
    host: "localhost",
    port: 5432,
    database: "praktyki"
});

module.exports = pool;