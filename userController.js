const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByUsername } = require("../models/user");

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, hashedPassword);
    res.status(201).json({ user });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await findUserByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ userId: user.id }, "your_jwt_secret");
        res.json({ token });
    } else {
        res.status(401).json({ error: "Invalid credentials" });
    }
};
