const express = require('express');
const { addInterns } = require('../Controllers/internsController');
const { createCollege, collegeDetails } = require("../Controllers/collegeController")

const router = express.Router();

router.post("/functionup/colleges", createCollege)

module.exports = router;