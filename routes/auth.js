const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middlware/auth');
const User = require('../models/User');

//@route GET api/auth
//@desc Get the logged in user
//@access Private

router.get('/', auth, async(req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route POST api/auth
//@desc Authorse user and get the token
//@access Public

router.post('/',[
    check('email','Please provide a valid email').isEmail(),
    check('password', 'Please enter a password').exists()
], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const{email, password} = req.body
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: 'A user with this email does not exist'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg: 'Incorrect password'})
        }
        const payload ={
            user:{
                id : user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'),{
            expiresIn: 3600000
        },(err, token)=>{
            if(err) throw err;
            res.json({token})
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;