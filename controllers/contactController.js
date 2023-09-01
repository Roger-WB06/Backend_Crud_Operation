const asyncHandler = require('express-async-handler')
const ContactModel = require('../models/contactModel')

// @desc get all contacts
// @route GET /api/contacts
// @access private
const getContacts = asyncHandler(async(req,res)=> {
    const contacts = await ContactModel.find({user_id: req.user.id})
    res.status(200).json(contacts)
})


// @desc create new contact
// @route POST /api/contacts
// @access private
const createContact = asyncHandler(async(req,res)=> {
    console.log(req.body)
    const {name, email, phone} = req.body
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All fields are mendatory!")      
    }
    else{
        const contact = await ContactModel.create({
            name,
            email,
            phone,
            user_id: req.user.id
        })
        res.status(201).json(contact)
    }
})

// @desc get a contact
// @route GET /api/contacts/:id
// @access private
const getContact = asyncHandler(async(req,res)=> {
    const contact = await ContactModel.findById(req.params.id)
    if(!contact)
    {
        res.status(404)
        throw new Error("Conatct Not Found")
    }
    res.status(200).json(contact)
})

// @desc update contact
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async(req,res)=> {
    const contact = await ContactModel.findById(req.params.id)
    if(!contact)
    {
        res.status(404)
        throw new Error("Conatct Not Found")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User don't have permission to change other user contact")
    }

    const updatedContact = await ContactModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedContact)
})


// @desc delete contact
// @route   DELETE /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async(req,res)=> {
    const contact = await ContactModel.findById(req.params.id)
    if(!contact)
    {
        res.status(404)
        throw new Error("Conatct Not Found")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User don't have permission to delete other user contact")
    }

    await ContactModel.deleteOne({_id: req.params.id})
    res.status(200).json(contact)
})



module.exports = { getContacts, createContact, getContact, updateContact, deleteContact }