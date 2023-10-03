const { getUsers, insertUser } = require("../services/userService")

const getAllUsersController = async(req, res) => {
    try{
        const users = await getUsers();
        res.status(200).json({users});
    }catch(error){
        res.status(500).json({message: error?.message})
    }
}

const insertUserController = async (req, res)=>{
    const {userName, userEmail, userDob, userUserName, userPassword} = req.body;
    if(!userName || !userPassword)
    {
        return res.status(400).json({message: "missing data"})
    }

    try{
        const response = await insertUser(userName, userEmail, userDob, userUserName, userPassword);
        res.status(201).json({response});
    }catch(error){
        res.status(500).json({error: error?.message});
    }
}

module.exports = {
    getAllUsersController,
    insertUserController,
}