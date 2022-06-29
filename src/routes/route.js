const express = require("express");
const collegeController = require("../controller/collegeController");
const internController = require ("../controller/internController")
const router = express.Router();


//POST API 
router.post("/functionup/colleges",collegeController.college);
router.post("/functionup/interns",internController.intern);
router.get("/functionup/collegeDetails", collegeController.getColleges);

module.exports = router;