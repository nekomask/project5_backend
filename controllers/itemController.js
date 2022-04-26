const express = require('express');
const router = express();
const Item = require('../models/item')
//index route
router.get('/', async (req, res) => {
    //if the data is good we get our item objects
    try {
        const items = await Item.find();
        res.send({
            success: true,
            data: items
        })
        //if there is an error we're going to send this object; we don't want to map over errors and try to render them
    } catch(err) {
        res.send({
            success: false,
            data: err.message
        })
    }
})
//create route
router.post('/', async (req, res) => {
    try {
        const newItem = await Item.create(req.body);
        //we used to redirect to the index or the show route, but now we're just sending back a JSON response 
        res.send({
            success: true,
            data: newItem
        })
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