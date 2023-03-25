const express = require('express');
const router = express.Router();
const USER = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secret = process.env.SECRET_KEY;

router.post('/login', async (req,res)=>{
    try{
        const {email, password} = req.body;
    const user  =  await USER.findOne({email: email});
    if(!user){
        return res.status(404).json({
            error: "user not found"
        })
    }
    bcrypt.compare(password, user.password, (err, result)=>{
        if(err){
            return res.status(404).json({
                error: err
            })
        }
        if(result){
            const token = jwt.sign({_id: user.id}, secret)
            //console.log(token);
            return res.status(200).json({
                token: token,
                user
            })
        }
        else{
            return res.status(422).json({
                error: "Invalid Credentials"
            })
        }
    })
    }
    catch(e){
        return res.status(422).json({
            status: "failure",
            error: e.error
        })
    }
})
    
module.exports = router