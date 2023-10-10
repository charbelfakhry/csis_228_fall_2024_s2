const { validationResult } = require("express-validator");
const { getUsers, insertUser, updateUser } = require("../services/userService")

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



module.exports = {
    getAllUsersController,
    insertUserController,
    updateUserController,
}