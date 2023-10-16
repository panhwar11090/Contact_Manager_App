const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middlware/auth')
const User = require('../models/User');
const Contact = require('../models/Contact');

//@route GET api/contacts
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

//@route POST api/contacts
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



//@route PUT api/contacts/:id
//@desc Update the contact
//@access Private

router.put('/:id',auth, async(req,res)=>{
    const {name, email, phone, type} = req.body;

    const contactFields={ };

    if(name) contactFields.name=name;
    if(email) contactFields.email=email;
    if(phone) contactFields.phone=phone;
    if(type) contactFields.type=type;

    try {
        let contact = await Contact.findById(req.params.id);

        //check if contact exists
        if(!contact) return res.status(404).json({msg:'This contact does not exist'});

        //if the contact exist, then make user the currently signed in user owns the contact

        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg:' you do not have the correct authorization to update this contact'})
        }

        //Update contact if above condition pass
        contact = await Contact.findByIdAndUpdate(req.params.id,
            {$set: contactFields},
            {new:true}
            );

         // Return the updated contact
        res.json(contact);   
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});


//@route DELETE api/contact/:id
//@desc Delete a contact
//@access Private

router.delete('/:id',auth,async (req,res)=>{
    try {
        let contact = await Contact.findById(req.params.id);

        //check if contact exists
        if(!contact) return res.status(404).json({msg:'This contact does not exist'});

        //if the contact exist, then make user the currently signed in user owns the contact

        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg:' you do not have the correct authorization to update this contact'})
        }

        //Find the contact Remove from the MongoDB
        await Contact.findByIdAndRemove(req.params.id);

        //Return a cofirmation message
        res.json({msg:'This conatct has been removed'});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;