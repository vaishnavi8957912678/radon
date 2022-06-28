const mongoose = require("mongoose")

const internSchema = new mongoose.Schema({

    name: {
        type: String,
        required: "plz Enter your name"
    },
    email: {
        type: String,
        required: "plz enter email address",
        unique: true
    },
    mobile: {
        type: Number,
        required: "plz enter mobile number",
        maxlength: 10,
        minlength: 10,
        unique: true
    },
    collegeId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'college'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

module.exports = mongoose.model("intern", internSchema)