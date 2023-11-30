const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { getUsers, insertUser, updateUser, authenticate } = require("../services/userService");
const { query } = require("../database/db");


const authenticateController = async(req, res)=>{
    const {username, password}  = req.body;
    if(!username){
        return res.status(401).json({message: "missing data"});
    }

    const result = await authenticate(username, password);
    if(!result){
        return res.status(401).json({message: "Wrong user/pass"});
    }

    const token = jwt.sign({userId: result?.user_id}, process.env.SECRET_KEY);
    res.status(200).json({message: "authenticated", user: result, token});
}

const getAllUsersController = async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: error?.message })
    }
}

const insertUserController = async (req, res) => {

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userName, userEmail, userDob, userUserName, userPassword } = req.body;

    try {
        const response = await insertUser(userName, userEmail, userDob, userUserName, userPassword);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

const updateUserController = async (req, res) => {
    const { userId, userName, userEmail, userDob, userUserName, userPassword } = req.body;
    if (!userId) {
        return res.status(400).json({ message: "missing data" })
    }

    try {
        const response = await updateUser(userId, userName, userEmail, userDob, userUserName, userPassword);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}


const deleteUser = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "missing user id" });
    }

    try {
        const result = await deleteUser(userId);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const addUserForm = (req, res) =>{
    res.render("addUser");
}

const viewUserForm = async(req, res) =>{
    const sql = "select * from users where user_id = 3";
    const user = await query(sql);
    let data ={
        user: user[0]
    }
    res.render("editUser", data);
}


module.exports = {
    getAllUsersController,
    insertUserController,
    updateUserController,
    authenticateController,
    addUserForm,
    viewUserForm,
}