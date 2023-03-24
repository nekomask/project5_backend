const User = require("../models/users")
const Items = require('../models/item')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const isLoggedIn = require('../middleware/isLoggedIn')
const jwt = require('jsonwebtoken');


const emailIsValid = (email) => {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
};

// INDEX: GET
// /users
// Gives a page displaying all the users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send({
            status: 200,
            data: users
        })
    } catch (err) {
        res.send({
            status: 500,
            data: err
        })
    }
})



// SHOW: GET
// /users/:id
// Shows a page displaying one user
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    const userItems = await Items.find({ user: req.session.userId })
    res.send({
        status: 200,
        data: user
    })
})

// CREATE: POST
// /users
// Creates an actual user, then...?
router.post('/register', async (req, res) => {
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username: req.body.username.toLowerCase() });

        if (existingUser) {
            return res.status(400).json({ error: "Username already exists." });
        }
        const existingEmail = await User.findOne({ email: req.body.email.toLowerCase() });

        if (existingEmail) {
            return res.status(400).json({ error: "Sorry, that email is already registered to an account." });
        }


        // Validate email
        if (!emailIsValid(req.body.email)) {
            return res.status(400).json({
                error: "Invalid email format.",
            });
        }


        // req.body.password needs to be HASHED
        console.log(req.body);
        const hashedPassword = await bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;
        const newUser = await User.create(req.body);
        console.log("user\n", newUser);

        // Create a token for the new user
        const token = jwt.sign(
            { _id: newUser._id, username: newUser.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({ status: 201, data: newUser, token: token });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});

// EDIT: GET
// /users/:id/edit
// SHOW THE FORM TO EDIT A USER
router.get('/:id/edit', async (req, res) => {
    try {
        if (req.session.userId === req.params.id) {
            const user = await User.findById(req.params.id)
            res.send({
                status: 200,
                data: user
            })

        } else {
            throw new Error("You're NOT THAT USER!")
        }
    } catch (err) {
        res.sendStatus(500)
    }
})

// UPDATE: PUT
// /users/:id
// UPDATE THE USER WITH THE SPECIFIC ID
router.put('/:id', async (req, res) => {
    try {
        //Hash the new Password
        const HashedPassword = await bcrypt.hashSync(req.body.password, 10);
        //update the user document in the database
        const user = await User.findByIdAndUpdate(req.params.id, {
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            mod: req.body.mod
        });
        res.send({
            status: 200,
            data: user
        })
    } catch (err) {
        res.sendStatus(500)
    }
})
// DELETE: DELETE
// /users/:id
// DELETE THE USER WITH THE SPECIFIC ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.send({
            status: 200,
            data: user
        })
    } catch (err) {
        res.sendStatus(500)
    }
})


module.exports = router;