const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middlware/auth')
const User = require('../models/User');
const Contact = require('../models/Contact');

//@route GET api/users
//@desc Get all the users contacts
//@access Private

router.get('/', auth,async (req,res)=>{
    try {
        const contacts = await Contact.find({user: req.user.id}).sort({
            date: -1
        });
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route POST api/users
//@desc Add a new  contact
//@access Private

router.post('/', [auth,[
    check('name', 'Name is required').not().isEmpty()
]],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {name,email, phone, type}= req.body;
    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        })
        const contact = await newContact.save();
        res.json(contact);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});



//@route PUT api/users
//@desc Update the contact
//@access Private

router.put('/:id', (req,res)=>{
    res.send('Update the contact');
});


//@route DELETE api/users
//@desc Delete a contact
//@access Private

router.delete('/:id', (req,res)=>{
    res.send('Delete a contact');
});



module.exports = router;