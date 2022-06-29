const mongoose = require("mongoose")

const internSchema = new mongoose.Schema({

    name: {
        type: String,
        required:[true, "plz Enter your name"],
        trim:true,
    },
    email: {
        type: String,
        required:[true ,"plz enter email address"],
        unique: true,
        trim: true
    },
    mobile: {
        type: Number,
        required:[true ,"plz enter mobile number"],
        unique: true,
        trim:true
    },
    collegeId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'college',
        trim:true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

module.exports = mongoose.model("intern", internSchema)