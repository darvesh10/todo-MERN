const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name:{
    type: String,
    required: [true, "please add a name"],
},  
    email: {
        type: String,
        required: [true,"please add an email"],
        unique: true,
        match: [
            /^\S+@\S+\.\S+$/,
            "Please use a valid email address",
          ],
    },
      password: {
        type: String,
        required: [true, "please add a password"],
        minlength: 6,
      },
},{
    timestamps: true,
});


userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;// 
