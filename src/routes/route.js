const express = require("express");
const collegeController = require("../controller/collegeController");
const router = express.Router();


//POST API 
router.post("/functionup/colleges",collegeController.college);



module.exports = router;