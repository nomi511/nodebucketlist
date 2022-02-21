require("dotenv").config()
const {UnAuth} = require("../errors")
const jwt = require("jsonwebtoken")

const Authenticate = (req, res, next) => 
{
    const tok = req.headers.authorization

    if(!tok || !tok == "Bearer ")
    {
        throw new UnAuth("User is looged out! Sign in again")
    }

    const token = tok.split(" ")[1]
    
    try {
        
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {id: payload.id}

        next()

    } catch (error) {
        throw new UnAuth("please provide valid credentials")
    }

}


module.exports = Authenticate