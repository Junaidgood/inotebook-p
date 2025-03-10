const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//Route 1: Get all the notes using get :/api/notes/getuser , login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.send(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
})

//Route 2: Add a new notes using POST :/api/notes/addnote , login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid name').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })], async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            //if there are error , return bad request and errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = await Note({
                title, description, tag, user: req.user.id
            })
            const savedNotes = await note.save()
            res.send(savedNotes)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("internal server error")
        }
    })

//Route 3: Update an existing notes using PUT :/api/notes/updatenote , login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //create a newnote object
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag };

        //find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("not found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
})

//Route 4: delete an existing notes using DELETE :/api/notes/deletenote , login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
       try {

        //find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("not found") }

        //Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
})

module.exports = router