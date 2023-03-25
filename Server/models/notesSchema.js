const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {type: String, required: true},    
    description: {type: String, required: true},
    
}, {timestamps: true})

const noteModel = mongoose.model('NOTE', noteSchema);

module.exports = noteModel;