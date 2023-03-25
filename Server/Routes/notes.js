const express = require('express');
const requirelogin = require('../middlewares/requirelogin');
const router = express.Router();
const NOTE = require('../models/notesSchema');

// post notes
router.post('/addnote', requirelogin,async (req,res)=>{
    try{        
        const note = await NOTE.create(req.body);
        return res.status(200).json({
        note,
        message: "Note added successfully"
    })
    }
    catch(e){
        return res.status(422).json({    
            status: "failure",        
            error: e.error
        })  
    }
})

// display all notes
router.get('/note', requirelogin, async (req,res)=>{
    try{
        const note = await NOTE.find();
        return res.status(200).json({
            status: "success",            
            note,        
    })
    }
    catch(e){
        return res.status(422).json({    
            status: "failure",        
            error: e.error
        })
    }
})

// find specific note
router.get('/note/:id', requirelogin,async (req, res)=>{
    try{
        const note = await NOTE.findById({_id: req.params.id});
        return res.status(200).json({
            status: "success",            
            note,        
    })
    }
    catch(e){
        return res.status(422).json({    
            status: "failure",        
            error: e.error
        })
    }
})
// update note
router.put('/update/:id', async (req,res)=>{
    try{
        const note = await NOTE.findByIdAndUpdate({_id: req.params.id}, req.body);
        const updatedData = await NOTE.findById({_id: req.params.id})
        return res.status(200).json({
            status: "success",            
            updatedData,        
    })
    }
    catch(e){
        return res.status(422).json({    
            status: "failure",        
            error: e.error
        })
    }
})

router.delete('/deleteall', requirelogin, async (req,res)=>{
    try{
        const note = await NOTE.deleteMany();
        return res.status(200).json({
            status: "success",            
            message: "Deleted Successfully"     
    })
    }
    catch(e){
        return res.status(422).json({    
            status: "failure",        
            error: e.error
        })
    }
})
// delete note
router.delete('/delete/:id', async (req,res)=>{
    try{
        const note = await NOTE.findByIdAndDelete({_id: req.params.id});
        return res.status(200).json({
            status: "success",            
            message: "Deleted Successfully"     
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