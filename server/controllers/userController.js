const User = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports.register = async(req,res,next) => {
   const {username,email,password} = req.body;
   const userNamecheck = await User.findOne({username});
   if(userNamecheck){
       return res.json({msg:"Username already used", status:false});
   }
   const emailCheck = await User.findOne({email});
   if(emailCheck){
       return res.json({msg:"Email already registered",status:false});
   }
   const hashedPassword = await bcrypt.hash(password, 10);
   const user = await Usesr.create({
       email,
       username,
       password:hashedPassword
   });
   delete user.password;
   return res.json({ status:true,user});
}; 