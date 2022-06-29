const internModel = require("../models/internModel");
const evalidator = require("validator");

const isValid = function (value) {
    if ( typeof value == 'number' ) {
          return false
      }
      return true
    }

const valid = function (value) {
        if ( typeof value == 'number' ) {
              return true
          }
          return false
        }


const intern = async function (req,res){
    try{
    let internData = req.body;
    if ( !isValid(internData.name) ) 
    return res.status(400).send({status: false, msg: "Enter Valid Name."})
    let mobile = internData.mobile
    if(mobile.length != 10){
       return res.status(400).send({status:false,msg: "invalid phone number"}) }
    if ( !valid(internData.mobile) ) 
    return res.status(400).send({status: false, msg: "Enter Valid Phone Number."})
    let duplicateEmail = internData.email
    duplicateEmail = await internModel.findOne({email : duplicateEmail})
    if(duplicateEmail){
        return res.status(400).send({status: false, msg : "Email Already Exist."})
    }
    let duplicatePhone = internData.mobile
    duplicatePhone = await internModel.findOne({mobile : duplicatePhone})
    if(duplicatePhone){
        return res.status(400).send({status: false, msg : "Phone Number Already Exist."})
    }
    let validate = evalidator.isEmail(internData.email);
    if (!validate){
      return res
        .status(400)
        .send({status:false, msg: "You have entered an invalid email address!" });
    }
    
    let result= await internModel.create(internData);
    res.status(201).send({status:true, Data:result});
    } catch (err){
        res.status(500).send({status:false, msg:  err.message});
    }
};

module.exports ={
    intern : intern,
}