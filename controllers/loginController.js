const User = require("../models/users");
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post("/", async (req, res) => {
    try{
        // Grab the user from the database with the username from the form
        const possibleUser = await User.findOne({username: req.body.username})
        console.log(possibleUser)
        if(possibleUser){
            // There is a user with this username!
            console.log(possibleUser.password)
            console.log(req.body.password)
            // Compare the password from the form with the database password
            if(bcrypt.compareSync(req.body.password, possibleUser.password)){
                // It's a match! Successful login!
                req.session.isLoggedIn = true;
                req.session.userId = possibleUser._id;
                // Generate a JWT
        const token = jwt.sign({ _id: possibleUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ success: true, token: token, key: possibleUser._id, username: possibleUser.username });
             
            }else{
                res.status(401).send({ error: 'password does not match records' });
            }
        }else{
            // Let them try again?
            res.status(401).send({ error: 'User name does not exist' });

            // EDWARD: Don't redirect in this case, instead send back a 401 UNAUTHORIZED

        }
    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
})

module.exports = router;
