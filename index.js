const express = require("express");
const moment = require("moment");
const { query } = require("./database/db");
require('dotenv').config();
const mysql = require("mysql2");

const bodyParser = require('body-parser');
const cors = require('cors');


const port = process.env.APP_PORT;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors({origin: '*'}));

const userRoute = require('./routes/user.route');
const typi = require('./routes/typi.route');
const { getTypiCodeData } = require("./services/fetchData");

app.get("/", async(req, res)=>{
    const posts = await getTypiCodeData();
    res.status(200).json(posts);
});

app.use('/api/users', userRoute);
app.use('/api/typi', typi);



app.listen(port, ()=>{
    console.log(`my app is listening ${port}`);
})

