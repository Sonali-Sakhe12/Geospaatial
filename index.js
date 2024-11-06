const express = require("express");
const { register, login } = require("../controllers/userController");
const { uploadFile } = require("../controllers/fileController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/upload", auth, uploadFile); // Authenticated file upload route

module.exports = router;