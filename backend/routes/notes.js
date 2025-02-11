const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//Route 1: Get all the notes using get :/api/auth/getuser , login required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try{
    const notes = await Note.find({user: req.user.id})
    res.send(notes)

    }catch(error){
        console.error(error.message);
        res.status(500).send("internal server error")
    }
})

//Route 2: Add a new notes using POST :/api/auth/addnote , login required
router.post('/addnote',fetchuser,[
    body('title','Enter a valid name').isLength({ min: 3 }),
    body('description','Description must be atleast 5 characters').isLength({ min: 5 })],async (req,res)=>{
    try{
    const {title, description, tag}= req.body;
    //if there are error , return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const note = await Note({
     title,description,tag, user:req.user.id
    })
    const savedNotes = await note.save()
    res.send(savedNotes)
   }catch(error){
    console.error(error.message);
    res.status(500).send("internal server error")
}
})

module.exports = router