const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");
const evalidator = require("validator");
const mongoose = require("mongoose");


const isValid = function(value) {
    if(typeof (value) == "undefined" || typeof (value) == null) {return false}
    if(typeof (value) == "string" && (value).trim().length == 0) {return false}
    if(typeof (value) == 'number' && (value).toString().trim().length == 0){return false}
    return true
}


const college = async function (req, res) {
  try {
    let collegeData = req.body;
    //const {name, fullNae}

    if (Object.keys(collegeData).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Body should  be not Empty.. " });
    }

    if (!isValid(collegeData.name)) {
      return res
        .status(400)
        .send({ status: false, msg: "Name field is mandatory" });
    }

    if (!isValid(collegeData.fullName)) {
      return res
        .status(400)
        .send({ status: false, msg: "FullName field is mandatory" });
    }

    if (!isValid(collegeData.logoLink)) {
      return res
      .status(400)
      .send({ status: false, msg: "LogoLink filed is mandatory" });
    }

    let duplicateName = collegeData.name;

    duplicateName = await collegeModel.findOne({ name: duplicateName });
    if (duplicateName) {
      return res
        .status(400)
        .send({ status: false, msg: "Name Already Exist." });
    }
    
    if (!isValid(collegeData.name))
      return res.status(400).send({ status: false, msg: "Enter Valid Name." });

    let name = /^[A-Z a-z]+$/.test(collegeData.name);
    if (!name)
      return res
        .status(400)
        .send({ status: false, msg: "Please Use only Alphabets in name" });

    name = /^[A-Z a-z]+$/.test(collegeData.fullName);
    if (!name)
      return res
        .status(400)
        .send({ status: false, msg: "Please Use only Alphabets in full name" });

    if (!isValid(collegeData.fullName))
      return res
        .status(400)
        .send({ status: false, msg: "Enter Valid Full Name." });

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

    let result = await collegeModel
      .findOne({ name: college })
      .select({ name: 1, fullName: 1, logoLink: 1, _id: 1 });

    let collegeId = result._id.toString();

    let interns = await internModel
      .find({ collegeId: collegeId })
      .select({ name: 1, email: 1, mobile: 1 });

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
