const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const connection = require("./db");
const port = process.env.PORT || 3000;

app.use(express.json());
connection();

app.use("/api/v1/event", require("./src/router/event"));
app.use("/api/v1/user", require("./src/router/user"));

app.listen(port, ()=> console.log(`server is running on port ${port}`));