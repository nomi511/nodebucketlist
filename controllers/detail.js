const Detailitem = require("../models/detailmodel")
const {NotFound, BadRequest} = require("../errors")

const detail = async (req,res)=>
{
    const {mid} = req.query 
    const ditems = await Detailitem.find({mainid:mid})
    res.status(200).json(ditems)
}

const singledetail = async (req,res)=>
{
    const {id} = req.params
    const onedetail = await Detailitem.findById(id)
    if(!onedetail)
    {
        throw new NotFound("NOT FOUND")
    }
    res.status(200).json(onedetail)
}

const createdetail = async (req,res)=>
{
    const {mainid,task} = req.body
    const item = await Detailitem.create(req.body)
    console.log(item)
    res.status(200).json(item)
}

const updatedetail = async (req,res)=>
{
    const {id} = req.params
    const detItem = await Detailitem.findByIdAndUpdate(id,req.body, {new:true, runValidators:true})
    res.status(200).json(detItem)
}

const deletedetail = async (req,res)=>
{
    const {id} = req.params
    const deleted = await Detailitem.findByIdAndDelete(id)
    res.status(200).json(deleted)
}


module.exports = 
{
    singledetail,
    createdetail,
    detail,
    updatedetail,
    deletedetail
}