const {CustomError} = require("../errors")
const {StatusCodes} = require("http-status-codes")

const errorhandler = ( err, req, res, next) =>
{

    const cusError = 
    {
        statuscode : err.statuscode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg : err.msg || "something went wrong, try again later"
    }

    // if(err instanceof CustomError)
    // {
    //     return res.status(err.statuscode).json({msg: err.message})
    // }

    if(err.name === "ValidationError")
    {
        cusError.msg = Object.values(err.errors).map((item)=>item.message).join(",")
        cusError.statuscode = 400
    }

    if(err.code && err.code === 11000)
    {
        cusError.msg = `Dupblicate value entered for ${Object.keys(err.keyValue)}, Please enter different value.`
        cusError.statuscode = 400
    }

    if(err.name === "CastError")
    {
        cusError.msg = "item not found"
        cusError.statuscode = 400
    }

    
    return res.status(cusError.statuscode).json({msg: cusError.msg})
    
}


module.exports = errorhandler




