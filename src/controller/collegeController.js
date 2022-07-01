const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");
const valid = require("../validation/validation")




const college = async function (req, res) {
  try {
    let collegeData = req.body;
    let {name, fullName, logoLink} = req.body

    if (Object.keys(collegeData).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Body should  be not Empty.. " });
    }

     if(!valid.isValid(name)){ 
        return res
           .status(400)
           .send({ status: false, msg: "Name field is mandatory" });
      }
     

    if (!valid.isValid(fullName)) {
      return res
        .status(400)
        .send({ status: false, msg: "FullName field is mandatory" });
    }

    if (!valid.isValid(logoLink)) {
      return res
        .status(400)
        .send({ status: false, msg: "LogoLink filed is mandatory" });
    }


    let duplicateName = await collegeModel.findOne({ name: name });
    if (duplicateName) {
      return res
        .status(400)
        .send({ status: false, msg: "Name Already Exist." });
    }
    
    name = name.toLowerCase()
    if (!valid.reg(name))
      return res
        .status(400)
        .send({ status: false, msg: "Please Use only Alphabets in name" });

      name = name.toLowerCase()
      console.log(name)
     collegeData.name = name
     

    if (!valid.reg(fullName))
      return res
        .status(400)
        .send({ status: false, msg: "Please Use only Alphabets in full name" });


    let result = await collegeModel.create(collegeData);
    res.status(201).send({ status: true, Data: result });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

const getColleges = async function (req, res) {
  try {
    let college = req.query.collegeName;
    
    if (Object.keys(req.query).length == 0) {
      return res
      .status(400)
      .send({ status: false, msg: "Enter college Name.. " });
    }
    
    college = college.toLowerCase()
    let result = await collegeModel
      .findOne({ name: college })
      .select({ name: 1, fullName: 1, logoLink: 1, _id: 1 });

    if (!result) {
      return res.status(404).send({ status: false, msg: "College Does Not Exist" })
    }

    let collegeId = result._id.toString();

    let interns = await internModel
      .find({ collegeId: collegeId })
      .select({ name: 1, email: 1, mobile: 1 });

    if (interns.length == 0) {
      return res.status(404).send({ status: false, msg: "No intern exist." })
    }

    let name = result.name;
    let fullName = result.fullName;
    let logoLink = result.logoLink;
    let internDetails = {
      name: name,
      fullName: fullName,
      logoLink: logoLink,
      interns: interns,
    };

    return res.status(200).send({ status: true, Data: internDetails });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = {
  college: college,
  getColleges: getColleges,
};