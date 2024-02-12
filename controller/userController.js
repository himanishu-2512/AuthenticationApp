const User = require("../model/user");

module.exports = {
  getDetails: async (req, res) => {
    const id = req.user._id;
    const user = await User.findById(id);
    res.status(200).json(user);
  },
  getAll:async(req,res)=>{
    const users=await User.find({});
    res.json(users);
  }
};
