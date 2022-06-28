const mongoose = require("mongoose")

const collegeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: "plz Enter college name",
        unique: true
    },
    fullName: {
        type: String,
        required: "plz Enter full name of  college "
    },
    logoLink: "https://functionup-stg.s3.ap-south-1.amazonaws.com/thorium/iitd.png",
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

module.exports = mongoose.model("college", collegeSchema)
