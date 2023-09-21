const { query } = require("../database/db")


const loadUser = async() => {
    try{
        let sql = `SELECT * FROM users`
        const users = await query(sql);
        return users;
    }catch(erorr){
        throw new Error(error);
    }
}

const loadSingleUser = async(id)=>{
    try{
        let sql = `SELECT * FROM users WHERE user_id = ?`;
        const user = await query(sql, [id]);
        return user;
    }catch(erorr){
        throw new Error(erorr);
    }
}

const insertUser = async(user) =>{
    const {user_name, user_username, user_password, user_dob} = user;
    let inserSQL = `INSERT INTO user
    VALUES 
    (?, ?, ?, ?)`;

    const result = await query(sql, [user_name, user_username, user_password, moment(user_dob).format("YYYY-MM-DD")]);

    return result;
}

module.exports = {
    loadUser,
    loadSingleUser,
    insertUser,
}