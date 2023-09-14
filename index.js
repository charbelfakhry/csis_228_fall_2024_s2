const express = require("express");
const moment = require("moment");

const port = 3001;

const app = express();

app.get("/", (req, res)=>{
    res.status(200).json({message: "this is the index page"})
});

app.get("/test", (req, res)=>{
    res.status(200).json({
        message: "this the test route",
        code: 200,
        users: dummyUsers(),
    })
});

app.get("/test1", (req, res)=>{

    const users = dummyUsers();
    let html = `<table><th>Name</th><th>Password</th></table>`

    res.send(html);
})

const dummyUsers = () =>{
    let users = [];
    for (let i = 0; i < 100; i++)
    {
        users.push({
            name: `test ${i}`,
            password: `password ${i}`,
            dob: moment().format("YYYY-MMM-DD hh:mm:SS"),
        });
    }
    return users;
}

app.listen(port, ()=>{
    console.log(`my app is listening ${port}`);

})

