const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel")
const evalidator = require("validator");
const mongoose= require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const isValid = function (value) {
    if ( typeof value == 'number' ) {
          return false
      }
      return true
    }

const college = async function (req,res){
    try{
    let collegeData = req.body;
    
    
    if ( !isValid(collegeData.name) ) 
    return res.status(400).send({status: false, msg: "Enter Valid Name."})
    if ( !isValid(collegeData.fullName) ) 
    return res.status(400).send({status: false, msg: "Enter Valid Full Name."})
    let result= await collegeModel.create(collegeData);
    res.status(201).send({status:true, Data:result});
    } catch (err){
        res.status(500).send({status:false, msg:  err.message});
    }
};


const getColleges = async function (req,res){
    try{
    let college = req.query.collegeId;
   let Id = college
    if(Id.length != 24){
        return res.status(400).send({status:false,msg: "invalid college name"}) }
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