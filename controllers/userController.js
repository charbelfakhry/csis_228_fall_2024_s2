const { loadUser } = require("../services/userService")

const getAllUsersController = async(req, res) => {
    /**
     *this is a call back function of the same execution.
     *loadUser().then((result)=>{
      *  res.status(200).json({result});})
     */
    try{
        const users = await loadUser();
        res.status(200).json({users});
    }catch(error){
        res.status(500).json({message: "Internal server error"})
    }
}

module.exports = {
    getAllUsersController,
}