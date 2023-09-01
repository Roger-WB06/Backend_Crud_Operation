const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    user_id:{
        type: String,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "Please add the contact name"]
    },

    email: {
        type: String,
        required: [true, "Please add the contact email"]
    },
    phone: {
        type: Number,
        required: [true, "Please add the contact Phone Number"]
    }
    },
    {
        timestamps: true,
    }
)

const ContactModel = mongoose.model("contacts", contactSchema);

module.exports = ContactModel