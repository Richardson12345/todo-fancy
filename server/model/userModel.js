const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username: {
        type : String,
        unique : true
    },
    password : {
        type : String
    },
    email: {
        type: String,
        unique: true
    }
})

const userModel = mongoose.model("user", userSchema);
module.exports = userModel

