const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');

// User Model
const User = require('../../models/User');

// @route GET api/user
// @desc Get All Users
router.get('/', (req, res) => {
    User.find()
        .sort({ date: -1 })
        .then(users => res.json(users));
});

// @route GET api/user/:id
// @desc Get the User
router.get('/:id', (req, res) => {
    User.findOne({ _id: req.params.id })
        .then((user) => res.status(200).json({ success: true, user }))
        .catch(err => {
            console.log(err);
            res.status(500).json({ success: false });
        });
});

// @route POST api/user
// @desc User Registration
router.post('/register', (req, res) => {
    const passwordMinChar = 4;
    let errors = [];

    if (
        !req.body.name ||
        !req.body.email ||
        !req.body.password ||
        !req.body.password2
    ) {
        errors.push({ text: 'Please fill in all fields' })
    }

    if (req.body.password !== req.body.password2) {
        errors.push({ text: 'Passwords do not match' });
    }

    if (req.body.password && req.body.password.length < passwordMinChar) {
        errors.push({ text: `Password must be at least ${passwordMinChar} characters` });
    }

    if (errors.length > 0) {
        res.status(400).json(errors);
    } else {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    errors.length = 0;
                    errors.push({ text: 'Email already taken' });
                    return res.status(422).json(errors);
                } else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            console.log(err);
                            res.status(500)
                                .json({
                                    error: err
                                });
                        } else {
                            const user = new User({
                                name: req.body.name,
                                email: req.body.email,
                                password: hash
                            });

                            user.save()
                                .then(user => res.json(user))
                                .catch(err => {
                                    console.log(err);
                                    res.status(500)
                                        .json({
                                            success: false
                                        });
                                });
                        }
                    });
                }
            });
    }
});

// @route POST api/user
// @desc Authenticate the user
router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                     success: false, 
                     message: 'Authentication failed' 
                });
            }

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        message: 'Authentication failed'
                    });
                }

                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user._id
                    }, process.env.SECRET_KEY, { expiresIn: '1h' });

                    return res.status(200).json({
                        success: true,
                        message: 'Authentication successful',
                        user,
                        token
                    });
                }

                res.status(401).json({
                    success: false,
                    message: 'Authentication failed'
                });
            });
        });
});

// @route DELETE api/user/:id
// @desc Delete A User
router.delete('/:id', (req, res) => {
    User.remove({ _id: req.params.id })
        .then(() => res.status(200).json({ success: true }))
        .catch(err => {
            console.log(err);
            res.status(500).json({ success: false });
        });
});

module.exports = router;