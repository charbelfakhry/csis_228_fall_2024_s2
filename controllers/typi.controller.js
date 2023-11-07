const { getPostsByUserId, insertTypiByUserId } = require("../services/fetchData");




const getTypiByUserIdController = async (req, res) => {
    try {
        const {userId} = req.body;
        if(!userId){
            res.status(403).json({message: "UserId empty"});
        }
        const posts = await getPostsByUserId(userId);
        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ message: error?.message })
    }
}
const insertTypiByUserIdController = async (req, res) => {
    try {
        const {userId} = req.body;
        if(!userId){
            res.status(403).json({message: "UserId empty"});
        }
        const posts = await insertTypiByUserId(userId);
        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ message: error?.message })
    }
}






module.exports = {
    getTypiByUserIdController,
    insertTypiByUserIdController
}