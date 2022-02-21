const CustomError = require("./customerror")
const {StatusCodes} = require("http-status-codes")


class Notfound extends CustomError
{
    constructor(message)
    {
        super(message)
        this.statuscode = StatusCodes.NOT_FOUND
    }
}

module.exports = Notfound