const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', (req,res)=>{
    const user= new User(req.body)
    console.log(req.body);
    user.save()
    res.send(req.body)
    
})

module.exports = router