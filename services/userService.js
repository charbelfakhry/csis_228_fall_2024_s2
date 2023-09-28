const { query } = require("../database/db");



const getUsers = async() => {
    const users = await query(sql);
    return users;
}

const getUserById = async(id) =>{
    let sql = `SELECT * FROM users WHERE user_id = ?`;
    const user = await query(sql, [id]);
    return user;
} 

const insertUser = async(user) =>{
    const {user_name, user_username, user_email, user_password, user_dob} = user;
    let sql = `INSERT INTO user 
    (user_name, user_username, user_email, user_password, user_dob)
    VALUES
    (?, ?, ?, ?, ?);
    `;
    const result = await query(sql, 
        [
            user_name, 
            user_username, 
            user_email, 
            user_password, 
            moment(user_dob).format("YYYY-MM-DD")
        ]);
    return result;
}

const updateUser = async(user) => {
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
}

const deleteUser = async(id) =>{
    return await query("DELETE FROM user WHERE user_id = ?", [id]);
}

module.exports = {
    getUsers,
    getUserById,
    insertUser,
    updateUser,
    deleteUser,
}