const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

// Product Model
const Product = require('../../models/Product');

// @route GET api/products
// @desc Get All Products
router.get('/', checkAuth, (req, res) => {
    Product.find()
        .sort({ date: -1 })
        .then(products => res.json(products));
});

// @route POST api/products
// @desc Create A Product
router.post('/', checkAuth, (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price
    });

    newProduct.save()
        .then(product => res.json(product))
        .catch(error => {
            console.log(error);
            res.status(500)
                .json({
                    success: false
                });
        });
});

// @route PUT api/products/:id
// @desc Edit Product
router.put('/:id', checkAuth, (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            product.name = req.body.name
            product.price = req.body.price;

            product.save()
                .then(product => res.json(product))
                .catch(error => {
                    console.log(error);
                    res.status(404)
                        .json({
                            success: false
                        });
                });
        });
});

// @route DELETE api/products/:id
// @desc Delete A Product
router.delete('/:id', checkAuth, (req, res) => {
    Product.findById(req.params.id)
        .then(product => product.remove())
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