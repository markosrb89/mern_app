const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// @route POST api/send
// @desc Send email
router.post('/', (req, res) => {
    const output = `
        <p><b>You have new contact request</b></p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: `MERN Stack App - <${process.env.EMAIL}>`,
        to: 'krtolica89@gmail.com',
        subject: 'Contact request ✔',
        text: 'Hello World?',
        html: output
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500)
                .json({ success: false });
        }

        res.status(200)
            .json({
                success: true,
                message: 'Email is sent. We will contact you asap'
            });
    });
});

module.exports = router;