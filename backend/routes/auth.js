const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'goodwork@junaid';


router.post('/createuser', [
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

     // check whether the user with this email exists already
     try{
    let user = await User.findOne({email: req.body.email});
    console.log(user)
    if(user){
        return res.status(400).json({error:"sorry a user with this email already exists"})
    } 
    
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        //create a new user
        user = await User.create({
        name: req.body.name,
        password: secPass,
        email:req.body.email
    })
    // catch errors
    const data = {
        user:{
            id: user.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET)
    res.json({authtoken})
    res.json(user)
    } catch(error){
        console.error(error.message);
        res.status(500).send("some error occured")
    }
})

module.exports = router