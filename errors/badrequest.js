const CustomError = require("./customerror")
const {StatusCodes} = require("http-status-codes")


class Badrequest extends CustomError
{
    constructor(message)
    {
        super(message)
        this.statuscode = StatusCodes.BAD_REQUEST
    }
}


module.exports = Badrequest