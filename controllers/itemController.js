const express = require('express');
const router = express();
const Item = require('../models/item')
//index route
router.get('/', async (req, res) => {
    try {
        if (req.session.userId) {
            const items = await Item.find({ user: req.session.userId });
            res.send({
                success: true,
                data: items
            });
        } else {
            throw new Error('User not logged in');
        }
    } catch (err) {
        res.send({
            success: false,
            data: err.message
        });
    }
});

//create route
router.post('/', async (req, res) => {
    try {
        // Check if user is logged in
        if (req.session.userId) {
            const user = await User.findById(req.session.userId);
            if (user) {
                req.body.user = user._id;
                const newItem = await Item.create(req.body);
                user.bikes.push(newItem._id);
                await user.save();
                res.send({
                    success: true,
                    data: newItem
                });
            } else {
                throw new Error('User not found');
            }
        } else {
            throw new Error('User not logged in');
        }
    } catch (err) {
        console.log(err);
        res.send({
            success: false,
            data: err.message
        })
    }
})

//show route
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if(!item){
            throw new Error("No item by that ID here!")
        }
        res.send({
            success: true,
            data: item
        })
    } catch (err) {
        console.log(err);
        res.send({
            success: false,
            data: err.message
        })
    }
})
//delete route
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
            data: item
        })
    } catch (err) {
        console.log(err);
        res.send({
            success: false,
            data: err.message
        })
    }
})
//edit and update route
//{returnOriginal: false} is an option added to the findByIdAndUpdate method to yield an updated value as a response
router.put('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, {returnOriginal: false});
        res.send({
            success: true,
            data: item
        })
    } catch (err) {
        console.log(err);
        res.send({
            success: false,
            data: err.message
        })
    }
})


module.exports = router;