const mongoose = require("mongoose")
const collegeSchema = new mongoose.Schema({

    name: {
        type: String,
        required:[true, "plz Enter college name"],
        unique: true,
        trim:true
    },
    fullName: {
        type: String,
        required:[true, "plz Enter full name of  college "],
        trim:true
    },
    logoLink: {
        type:String,
        required:"enter college logo",
        trim:true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

module.exports = mongoose.model("college", collegeSchema)
