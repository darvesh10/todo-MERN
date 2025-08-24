const User = require('../models/User');
const bcrypt = require('bcrypt');
const genrateToken = require('../utils/generateToken');

const registerUser = async (req,res,next) => {
     const {name, email, password} = req.body;
     try{
        if(!name || !email || !password) {
            return res.status(400).json({message: "please fill all fields"})
        }
     
     const userExists  = await User.findOne({email});
     if(userExists) {
       return res.status(400).json({message: "user already exists"});
     }
     
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: genrateToken(user._id),
    })
   } catch(error){
      next(error);
   }
};


const loginUser = async (req,res,next) => {
   const {email,password} = req.body;
   try{
      const user = await User.findOne({email});
      if(user && (await bcrypt.compare(password,user.password))){
         res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            token: genrateToken(user._id)
         });
      } else{
         res.status(401).json({message: "invalid email or password"});
      }

   } catch(error){
      next(error)
   }
};

module.exports = {registerUser, loginUser}