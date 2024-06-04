const express = require("express");
const { addUser, login, bookTicket } = require("../controller/user");
const jwtVerify = require("../middleware/authToken");
const router = express.Router();

router.post("/signup", addUser);

router.post("/login", login);

router.post("/bookNow", jwtVerify, bookTicket);

module.exports = router;
