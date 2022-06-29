const internModel = require("../models/internModel");
const validator = require("validator");

const intern = async function (req,res){
    try{
    let internData = req.body;
    let result= await internModel.create(internData);
    res.status(201).send({status:true, Data:result});
    } catch (err){
        res.status(500).send({status:false, msg:  err.message});
    }
};

module.exports ={
    intern : intern,
}