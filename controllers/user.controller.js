const { createToken } = require("../helpers/token.helper");
const User = require("../models/user.model");

const signupUser = async (req, res) => {
  try {
    const { name, email, password, image, address, occupation } = req.body;

    const user = await User.signup(
      name,
      email,
      password,
      image,
      address,
      occupation
    );

    // create token

    const token = createToken(user._id)

    res.status(200).json({user,token});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// login user
const loginUser = async (req, res) => {
  try {
    const {email,password} = req.body
    const user = await User.login(email, password);

    const token = createToken(user._id)
    
    res.status(200).json({user,token});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};




// get all user 
const getAllUser = async(req,res)=>{
  const users = await User.find({})
  res.status(200).json(users)
}


module.exports = {
  signupUser,
  loginUser,
  getAllUser
};
