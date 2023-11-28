const express = require("express");
const moment = require("moment");
const { query } = require("./database/db");
require('dotenv').config();
const mysql = require("mysql2");
const ejs = require("ejs");

const bodyParser = require('body-parser');
const cors = require('cors');

const schedule = require("node-schedule");


const port = process.env.APP_PORT;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({ origin: '*' }));

app.set('view engine', 'ejs');

const userRoute = require('./routes/user.route');
const typi = require('./routes/typi.route');
const { getTypiCodeData } = require("./services/fetchData");

app.get("/", async (req, res) => {
    const data = {
        user: "user001",
        title: "Manager",
        content: "user001 is an HR manager",
        notification: 2555,
        users: [],
    }

    let users = await query("select * from users");
    
    for(let i = 0; i < users.length; i++)
    {
        let sql = `SELECT count(*) as comments FROM comment where post_users_id = "${users[i].user_id}"`;
        const comments = await query(sql);
        users[i].comments = comments[0].comments;
        
        
    }

    data.users = users;

    //res.status(200).json({});
    res.render("index", data);
});

app.use('/api/users', userRoute);
app.use('/api/typi', typi);

const startCronJob = (starDate) =>{
    // const job = schedule.scheduleJob('* * * * *', ()=>{

    //     console.log("schdeuler started at "+ new Date());

    // });
    const job = schedule.scheduleJob(starDate, ()=>{

        console.log("schdeuler started at "+ new Date());

    });
}

const specificDate = new Date(Date.now() + 5000);
startCronJob(specificDate);

startCronJob();

app.listen(port, () => {
    console.log(`my app is listening ${port}`);
})

