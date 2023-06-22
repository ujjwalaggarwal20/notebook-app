const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/authtoken');

const JWT_SECRET = "mysecretjwtcode";

// ROUTE 1: 2nd argument is an array which takes the parameters to be checked from request
router.post('/register', [
    body('name', "Name length should be greater than 3").isLength({ min: 3 }),
    body('username', "Username length should be greater than 3").isLength({ min: 3 }),
    body('password', "Password length should be greater than 3").isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    // checking if there are any errors in request
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // using try-catch statement in case any unknown error occurs on backend
    try {
        // checking if user already exists
        let user = await User.findOne({ username: req.body.username }); //using await as this returns a promise
        console.log(user);
        if (user) {
            return res.status(400).json({ error: "username not available" });
        }
        // generating secure hashed password to store on database
        const salt = await bcrypt.genSalt(10);
        const securepass = await bcrypt.hash(req.body.password, salt);
        // creating a new user
        user = await User.create({
            name: req.body.name,
            password: securepass,
            username: req.body.username
        })
        // user id from the database will be used for authentication inside the token
        const data = {
            user: {
                id: user.id
            }
        }
        // generating authentication token which will be used to authenticate the user after login, generated via JWT
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ authToken, success });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

    //THIS WAS THE CODE USED BEFORE CHECKING FOR user ALREADY IN DATABASE:
    //   .then(user => res.json(user)).catch(err => res.json({message: "Please check the input fields", Error: err}));
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);
});

// ROUTE 2: login with registered credentials
router.post('/login', [
    body('username', "Username length should be greater than 3").isLength({ min: 3 }),
    body('password', "Password should not be empty").exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    // checking if there are any errors in request
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "Enter valid credentials" });
        }
        let passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Enter valid credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ authToken, success });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required, (middleware: fetchuser is used here to fetch authtoken)
router.post('/getuser', fetchuser, async (req, res) => {
    let success = false;
    try {
        // get user id from req
        let userId = req.user.id;
        // finding user in database with help of user id, and selecting its data except password
        const user = await User.findById(userId).select('-password');
        success = true;
        res.json({user, success});
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;