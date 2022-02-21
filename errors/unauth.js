const CustomError = require("./customerror")
const {StatusCodes} = require("http-status-codes")


class Unauth extends CustomError
{
    constructor(message)
    {
        super(message)
        this.statuscode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = Unauth