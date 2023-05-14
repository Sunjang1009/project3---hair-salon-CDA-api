const express = require("express");
const Clients = require('../models/Clients');
const router = express.Router();

//router set up
router.get("/", async (req,res)=>{
    try{
        res.json(await Clients.find({}));
    }catch(err){
        res.status(400).json(err);
    }
});

router.post("/", async (req,res)=>{
    try{
        res.json(await Clients.create(req.body))
    }catch(err){
        res.status(400).json(err);
    }
});

router.put("/:id", async (req,res)=>{
    try{
        res.json(await Clients.findByIdAndUpdate(req.params.id, req.body, {new:true}));
    }catch(err){
        res.status(400).json(err);
    }
})

router.delete("/:id", async(req,res)=>{
    try{
        res.json(await Clients.findByIdAndRemove(req.params.id));
    }catch(err){
        res.status(400).json(err);
    }
})

module.exports = router;


