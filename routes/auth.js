const express = require('express');
const router = express.Router();

//@route GET api/users
//@desc Get the logged in user
//@access Private

router.get('/', (req,res)=>{
    res.send('Get the logged in user');
});

//@route POST api/users
//@desc Authorse user and get the token
//@access Public

router.post('/', (req,res)=>{
    res.send('Login the user');
});

module.exports = router;