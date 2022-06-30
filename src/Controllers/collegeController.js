const collegeModel = require("../Model/collegeModel");
const Interns = require('../Model/InternsModel');


const createCollege = async (req, res) => {
    try {
        let data = req.body;
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "please provide data" })

        if (!data.name) return res.status(400).send({ status: false, message: "name is Required" })
        if (!data.fullName) return res.status(400).send({ status: false, message: "fullName is Required" })
        if (!data.logoLink) return res.status(400).send({ status: false, message: "logoLink is Required" })

        let nameCheck = await collegeModel.findOne({ name: data.name })

        if (nameCheck) return res.status(401).send({ status: false, message: "name is already used" })

        let saveData = await collegeModel.create(data)
        res.status(201).send({ status: true, message: "college Created Successfully", data: saveData })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.createCollege = createCollege
