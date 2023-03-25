const express = require('express');
const router = express.Router();
const USER = require('../models/userSchema');
const bcrypt = require('bcrypt');


router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existUser = await USER.findOne({ email: email });
        if (existUser) {
            res.status(422).json({
                error: "user already exist"
            })
        }
        else {
            bcrypt.hash(password, 10, async function (err, hash) {
                if (err) {
                    res.status(422).json({
                        error: err
                    })
                }
                else {
                    const data = await USER.create({
                        email: email,
                        password: hash
                    });
                    res.status(200).json({
                        status: "success",
                        message: "Registration Successfull",
                        data
                    })
                }
            })

        }
    }
    catch (e) {
        res.status(422).json({
            status: "failure",
            error: e.error
        })
    }
})

module.exports = router;