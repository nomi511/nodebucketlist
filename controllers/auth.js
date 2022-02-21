const User = require("../models/usermodel")
const {BadRequest, UnAuth} = require("../errors")



const register = async (req,res)=>
{
    //const {name, email, password} = req.body

    const user = await User.create(req.body)
    console.log(user)
    const token = user.createJWT()

    res.status(200).json({user: user.name, token})
}



const login = async (req,res)=>
{
    const {email, password} = req.body

    if(!email || !password)
    {
        throw new BadRequest("please provide all the details")
    }

    const user = await User.findOne({email})

    if(!user)
    {
        throw new UnAuth("please provide valid credentials")
    }

    const pwdcompare = await user.comparePWD(password)

    if(!pwdcompare)
    {
        throw new UnAuth("wrong password entered")
    }

    const token = await user.createJWT();

    res.status(200).json({name: user.name, token})
}


module.exports = {
    login,
    register
}