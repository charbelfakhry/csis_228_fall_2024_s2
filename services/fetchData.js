const axios = require("axios");
const { query } = require("../database/db");


const getTypiCodeData = async() => {
    const URL = "https://jsonplaceholder.typicode.com/posts";
    const result = await axios.get(URL);
    return result ? result.data : [];
}

const getPostsByUserId = async(userId) => {
    const posts = await getTypiCodeData();
    const arr = [];
    for(const post of posts)
    {
        if(Number(post?.userId) === Number(userId))
        {
            arr.push(post);
        }
    }
    return arr;
}

const insertTypiByUserId = async(userId) =>{
    const posts = await getPostsByUserId(userId);
    let sql = `INSERT INTO typicode (user_id, id, title, body)
        VALUES (?, ?, ? , ?)`;
    for(const post of posts)
    {
        await query(sql, [post.userId, post.id, post.title, post.body]);
    }
    return "success"
}

module.exports = {
    getPostsByUserId,
    insertTypiByUserId,
}