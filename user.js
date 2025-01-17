const pool = require("../config/db");

async function createUser(username, hashedPassword) {
    const res = await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
        [username, hashedPassword]
    );
    return res.rows[0];
}

async function findUserByUsername(username) {
    const res = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return res.rows[0];
}

module.exports = { createUser, findUserByUsername };