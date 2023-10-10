const { query } = require("../database/db");
const moment = require("moment");



const getUsers = async() => {
    try{
        let sql = `select * from users`;
        const users = await query(sql);
        return users;
    }catch(error)
    {
        throw new Error(error);
    }
}

const getUserById = async(id) =>{
    try{
        let sql = `SELECT * FROM users WHERE user_id = ?`;
    const user = await query(sql, [id]);
    return user;
    }catch(error){
        throw new Error(erorr);
    }
} 

const insertUser = async(userName, userEmail, userDob, userUserName, userPassword) =>{
    try{
        let sql = `INSERT INTO users 
    (user_name, user_username, user_email, user_password, user_dob)
    VALUES
    (?, ?, ?, ?, ?);
    `;
    const result = await query(sql, 
        [
            userName, 
            userUserName, 
            userEmail, 
            userPassword, 
            moment(userDob).format("YYYY-MM-DD")
        ]);
        let insertedUser = await query("select * from users where user_id = ?", [result?.insertId]);
    return insertedUser;
    }catch(error){
        throw new Error(error);
    }
}

const updateUser = async(user) => {
    try{
        const {user_id, user_name, user_username, user_email, user_password, user_dob} = user;

    let sql = `UPDATE user SET 
    user_username = ?, 
    user_name = ?, 
    user_email = ?,
    user_password = ?,
    user_dob = ?
    WHERE user_id = ?;
    `;

    const result = await query(sql, [user_username, user_name, user_email, user_password, moment(user_dob).format("YYYY-MM-DD"), user_id]);
    }catch(error){
        throw new Error(error);
    }
}

const deleteUser = async(id) =>{
    try{
        return await query("DELETE FROM user WHERE user_id = ?", [id]);
    }catch(error){
        throw new Error(error);
    }
}

module.exports = {
    getUsers,
    getUserById,
    insertUser,
    updateUser,
    deleteUser,
}