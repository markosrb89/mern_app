const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

// Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get All Items
router.get('/', checkAuth, (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items));
});

// @route POST api/items
// @desc Create An Item
router.post('/', checkAuth, (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        price: req.body.price
    });

    newItem.save()
        .then(item => res.json(item))
        .catch(error => {
            console.log(error);
            res.status(500)
                .json({
                    success: false
                });
        });
});

// @route PUT api/items/:id
// @desc Edit Item
router.put('/:id', checkAuth, (req, res) => {
    Item.findById(req.params.id)
        .then(item => {
            item.name = req.body.name
            item.price = req.body.price;

            item.save()
                .then(item => res.json(item))
                .catch(error => {
                    console.log(error);
                    res.status(404)
                        .json({
                            success: false
                        });
                });
        });
});

// @route DELETE api/items/:id
// @desc Delete A Item
router.delete('/:id', checkAuth, (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove())
        .then(() => res.json({ success: true }))
        .catch(error => {
            console.log(error);
            res.status(404)
                .json({
                    success: false
                });
        });
});

module.exports = router;