
const mongoose = require("mongoose")


const connect = (url) =>
{
    mongoose.connect(url, ()=>{console.log("db connected!!")})
}

module.exports = connect