const User = require("../models/users")
const Items = require('../models/item')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const isLoggedIn = require('../middleware/isLoggedIn')
const jwt = require('jsonwebtoken');


// INDEX: GET
// /users
// Gives a page displaying all the users
router.get('/', async (req, res)=>{
    try{
  const users = await User.find();
  res.send ({
      status: 200,
      data: users
  })
} catch (err) {
    res.send ({
        status: 500,
        data: err
    })
}
})



// SHOW: GET
// /users/:id
// Shows a page displaying one user
router.get('/:id', async (req, res)=>{
    const user = await User.findById(req.params.id)
    const userItems = await Items.find({user : req.session.userId})
    res.send({
        status: 200,
        data: user
    })
})

// CREATE: POST
// /users
// Creates an actual user, then...?
router.post('/', async (req, res) => {
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ username: req.body.username });
  
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists." });
      }
  
      // req.body.password needs to be HASHED
      console.log(req.body);
      const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
      req.body.password = hashedPassword;
      const newUser = await User.create(req.body);
      console.log("user\n", newUser);
  
      req.session.isLoggedIn = true;
      req.session.userId = newUser._id;
      res.status(201).json({ status: 201, data: newUser });
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server error. Please try again later." });
    }
  });

// EDIT: GET
// /users/:id/edit
// SHOW THE FORM TO EDIT A USER
router.get('/:id/edit', async (req, res)=>{
    try{
        if(req.session.userId === req.params.id){
            const user = await User.findById(req.params.id)
            res.send({
                status: 200,
                data: user
            })
    
        }else{
            throw new Error("You're NOT THAT USER!")
        }
    }catch(err){
        res.sendStatus(500)
    }
})

// UPDATE: PUT
// /users/:id
// UPDATE THE USER WITH THE SPECIFIC ID
router.put('/:id', async (req, res)=>{
   try{
       const user = await User.findByIdAndUpdate(req.params.id, req.body)
        res.send({
            status: 200,
            data: user
        })
   }catch(err){
        res.sendStatus(500)
   }
})
// DELETE: DELETE
// /users/:id
// DELETE THE USER WITH THE SPECIFIC ID
router.delete('/:id', async (req, res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        res.send({
            status: 200,
            data: user
        })
    }catch(err){
        res.sendStatus(500)
    }
})


module.exports = router;