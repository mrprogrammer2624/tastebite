const express = require('express');
const app = express();
const dotenv = require("dotenv").config();
const db = require('./config/connection');
app.use(express.urlencoded());
const router = require('./routs/index');
app.use('/', router);
app.listen(process.env.PORT, (err) => {
    if(err) console.log(err);
    console.log(`Server is running on port ${process.env.PORT}`);
})