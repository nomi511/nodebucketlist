
const mongoose = require("mongoose")



const sideschema = mongoose.Schema({

    task:
    {
        type: String,
        required: [true, "Please provide collection name"],
        minlength: 3,
    },
    createdBy:
    {
        type: mongoose.Types.ObjectId,
        ref:"User",
        required: [true, "Please provide user Id"]
    }

})

module.exports = mongoose.model("Sidelist", sideschema)