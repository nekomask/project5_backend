const User = require("../models/users")
const Items = require('../models/item')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const isLoggedIn = require('../middleware/isLoggedIn')


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

// I would comment this out for now, I don't think this is useful
// Since this is an API, the redirect to `/create` is doing something weird

// router.get('/login', (req, res)=>{
//     res.redirect('/create')
// })

router.post("/login", async (req, res)=>{
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
                res.send(200)
                //res.redirect("/create") // <- No more redirect in this case - the browser frontend code manages its own state
            }else{
                res.send(JSON.stringify({ error: 'password does not match recoreds'}))
                
                // EDWARD: Don't redirect in this case, instead send back a 401 UNAUTHORIZED
                res.send(401)
            }
        }else{
            // Let them try again?

            // EDWARD: You can't alert here, this is the API.  Send back JSON
            res.send(JSON.stringify({ error: 'User name does not exist'}))

            // EDWARD: Don't redirect in this case, instead send back a 401 UNAUTHORIZED
            res.send(401)
        }
    }catch(err){
        console.log(err);
        res.send(500)
    }
})

// router.get('/logout', (req, res)=>{
//     req.session.destroy(()=>{
//         res.redirect("/items")
//     })
// })

router.get('/',  async (req, res)=>{
    const users = await User.find();
    res.send({
        status: 200,
        users: users
    })
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
router.post('/', async (req, res)=>{
    try{
        // req.body.password needs to be HASHED
        console.log(req.body)
        const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
        req.body.password = hashedPassword
        const newUser = await User.create(req.body);
        const user = await User.findOne({ username: req.body.username })
        console.log("user\n", user)
        if (user) {
            req.session.isLoggedIn = true;
            req.session.userId = user._id;
            res.send({
                status: 200,
                data: newUser
            })
        }
    }catch(err) {
        console.log(err)
        res.send({
            status: 500,
            data: "Sorry this username is already taken \n please try a different one"
        })
    }
})

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