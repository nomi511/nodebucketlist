require("dotenv").config()
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")



const userschema = mongoose.Schema({
    name:
    {
        type: String,
        required: [true, "Please provide name"],
        minlength: 3,
        maxlength: 100,
    },
    email:
    {
        type: String,
        required: [true, "Please provide email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
            "Provide Valid email" ],
        unique: true,
    },
    password:
    {
        type: String,
        required: [true, "Please provide password"],
        minlength: 8,
    }
})


userschema.pre("save", async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


userschema.methods.createJWT = function()
{
    return jwt.sign({id: this._id, name: this.name}, process.env.JWT_SECRET, {expiresIn: process.env.JWTEXP})
}


userschema.methods.comparePWD = async function(pwd)
{
    const check = await bcrypt.compare(pwd, this.password)
    return check
}

module.exports = mongoose.model("User", userschema)