const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.set('strictQuery',false);
const DB_URL = process.env.DB_URL;
async function getConncetion(){
   await mongoose.connect(DB_URL).then(()=>{
        console.log("connceted successfully");
    }).catch(e=>{
        console.log("not connected");
    })
}
 module.exports = getConncetion;