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

    let duplicateName = collegeData.name
    duplicateName = await collegeModel.findOne({name : duplicateName})
    if(duplicateName){
        return res.status(400).send({status: false, msg : "Name Already Exist."})
    }
    let name=/^[A-Za-z]+$/.test(collegeData.name)
    if(!name) return res.status(400).send({status : false, msg : "Please Use Alphabets in name"})
    name=/^[A-Za-z]+$/.test(collegeData.fullName)
    if(!name) return res.status(400).send({status : false, msg : "Please Use Alphabets in full name"})
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
    let college = req.query.collegeName;
   let result= await collegeModel.findOne({name : college}).select({name:1, fullName: 1, logoLink: 1, _id:1})
   let collegeId = result._id.toString()
   let interns = await internModel.find({collegeId : collegeId}).select({name:1, email: 1, mobile: 1})
   console.log(interns)
   let name = result.name
   let fullName= result.fullName
   let logoLink= result.logoLink
   let internDetails = {
    name: name,
    fullName: fullName,
    logoLink: logoLink,
    interns: interns
   }
   
    return res.status(200).send({status:true, Data: internDetails});
    } catch (err){
        res.status(500).send({status:false, msg:  err.message});
    }
};


module.exports ={
    college: college,
    getColleges: getColleges
}