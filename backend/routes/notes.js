var express = require('express');
var router = express.Router();
const fetchuser = require('../middleware/authtoken');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/notes/fetchnotes". Login required
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        // finding the notes where user = req.user.id
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Get All the Notes using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser,
    // putting some restrictions on incoming req values
    body('title', "Title length should be greater than 3").isLength({ min: 3 }),
    body('description', "Description length should be greater than 3").isLength({ min: 5 }), async (req, res) => {
        try {
            const errors = validationResult(req);
            // checking if there are any errors in request
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            // get title, description, tag from body of req
            const { title, description, tag } = req.body;
            // making a new Note with given data as a variable
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            // saving the newly created note in database
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 3: Updating an Exsisting Note using: PUT "/api/notes/updatenote". Login required
// we added an id in the req parameters so to reach the only note to be updated (id of note)
router.put('/updatenote/:id', fetchuser,
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            let newNote = {}
            // check if title, description or tag is given in req, and if yes make a new obj with those , i.e. newNote
            if (title) { newNote.title = title };
            if (description) { newNote.description = description };
            if (tag) { newNote.tag = tag };

            // fetch the note corresponding to the id in parameter
            let note = await Note.findById(req.params.id);
            if (!note) {
                // check if the note exists
                return res.status(404).send('NOT ALLOWED');
            }
            // check if the user id and user id for the note searched for matches, means if the the note searched for has the same user as logged in
            if (req.user.id !== note.user.toString()) {
                return res.status(401).send('NOT YOUR DATA');
            }

            // updating the existing note with newNote
            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
            res.json({ note });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 3: Deleting an Exsisting Note using: DELETE "/api/notes/updatenote". Login required
// using id in parameters to search for the note
router.delete('/deletenote/:id', fetchuser,
    async (req, res) => {
        try {
            // fetch the note corresponding to the id in parameter
            let note = await Note.findById(req.params.id);
            if (!note) {
                // check if the note exists
                return res.status(404).send('NOT ALLOWED');
            }
            // check if the user id and user id for the note searched for matches, means if the the note searched for has the same user as logged in
            if (req.user.id !== note.user.toString()) {
                return res.status(401).send('NOT YOUR DATA');
            }
            note = await Note.remove({ _id: req.params.id });
            res.send("Note deleted successfully!");
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    })

module.exports = router;