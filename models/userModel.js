const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name"]
    },
    email: {
        type: String,
        required: [true, "Please Add the User Email address"]
    },
    password: {
        type: String,
        required: [true, "Please add user password"]
    },
}, {
    timestamps: true
})

const UserModel = mongoose.model("users", userSchema)

module.exports = UserModel