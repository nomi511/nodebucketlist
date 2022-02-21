
const mongoose = require("mongoose")
const { details } = require("../controllers/detail")


const detailschema = mongoose.Schema({
    mainid:
    {
        type: mongoose.Types.ObjectId,
        ref: "Sidelist",
        required: [true, "please provide sidelist id"],
    },
    task:
    {
        type: String,
        required: [true, "Please provide the task"],
        minlength: 3,
    },
    done:
    {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model("Detailitem", detailschema)