const express = require('express');
const router = express.Router();

//@route GET api/users
//@desc Get all the users contacts
//@access Private

router.get('/', (req,res)=>{
    res.send('Get all the users contacts');
});

//@route POST api/users
//@desc Add a new  contact
//@access Private

router.post('/', (req,res)=>{
    res.send('Add a contact');
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