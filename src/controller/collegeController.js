const collegeModel = require("../models/collegeModel");
const validator = require("validator");

const college = async function (req,res){
    try{
    let collegeData = req.body;
    // if(!(isvaild.check(collegeData.name) && isvaild.check(collegeData.fullName)))
    // return res.status(400).send({status:false, msg: "please check the name  fields"});

    let result= await collegeModel.create(collegeData);
    res.status(201).send({status:true, collegeData:result});
    } catch (err){
        res.status(500).send({status:false, msg:  err.message});
    }
};

module.exports ={
    college: college,
}