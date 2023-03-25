const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;
const USER = require('../models/userSchema');

module.exports = async(req,res,next)=>{
    const {authorization} = req.headers;
    //console.log(req.headers);
    if(!authorization){
       return res.status(409).json({
            error: "please login first"
        })
    }
    const token = authorization.replace("Bearer ", "");
    //console.log(token);
    jwt.verify(token, secret, async(err, payload)=>{
        if(err){
            return res.status(409).json({
                error: err
            })
        }

        else{
            const {_id} = payload;
            const userData = await USER.findById({_id})
           // console.log(userData);
            if(userData){
                req.user = userData
            }
           // console.log(req.user);
        }
    })
    next();
}