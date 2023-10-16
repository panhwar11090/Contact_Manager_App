const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route POST api/users
//@desc Register a user
//@access Public

router.post('/', [
    check('name', 'Please enter a name').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with at least 6 characters ').isLength({min:6}),
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const{name, email, password} = req.body
    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg: 'A User with this email is already exist'})
        }
        user = new User({
            name,
            email,
            password
        });
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

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