const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel")
const validator = require("validator");
const mongoose= require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const college = async function (req,res){
    try{
    let collegeData = req.body;
    
    let result= await collegeModel.create(collegeData);
    res.status(201).send({status:true, Data:result});
    } catch (err){
        res.status(500).send({status:false, msg:  err.message});
    }
};


const getColleges = async function (req,res){
    try{
    let college = req.query.collegeId;
     
   let result= await collegeModel.findOne({_id : college}).select({name:1, fullName: 1, logoLink: 1, _id:0})
   let interns = await internModel.find({collegeId : req.query.collegeId}).select({name:1, email: 1, mobile: 1})
   
    return res.status(200).send({status:true, Data: result,interns});
    } catch (err){
        res.status(500).send({status:false, msg:  err.message});
    }
};


module.exports ={
    college: college,
    getColleges: getColleges
}