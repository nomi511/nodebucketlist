const Sidelist = require("../models/sidemodel")
const {NotFound, BadRequest} = require("../errors")

const sidelist = async (req,res)=>
{
    const {id} = req.user
    const sidelist = await Sidelist.find({createdBy:id})
    res.status(200).json(sidelist)
}

const singlesidelist = async (req,res)=>
{
    const {id} = req.params 
    const sideitm = await Sidelist.findById(id)
    if(!sideitm)
    {
        throw new NotFound("NOT FOUND")
    }
    res.status(200).json(sideitm)
}

const createsidelist = async (req,res)=>
{
    const {id} = req.user
    req.body.createdBy = id
    await Sidelist.create(req.body)
    res.json({msg: "new collection created"})
}

const updatesidelist = async (req,res)=>
{
    const {id} = req.params
    const{id:userid} = req.user
    req.body.createdBy = userid
    const update = await Sidelist.findByIdAndUpdate(id,req.body, {new:true, runValidators:true})
    res.status(200).json(update)
}

const deletesidelist = async (req,res)=>
{
    const {id} = req.params
    const deleted = await Sidelist.findByIdAndDelete(id)
    res.status(200).json(deleted)
}


module.exports = 
{
    sidelist,
    singlesidelist,
    createsidelist,
    updatesidelist,
    deletesidelist
}