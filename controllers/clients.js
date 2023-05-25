const express = require("express");
const Clients = require('../models/Clients');
const router = express.Router();

//Client Index route
router.get("/", async (req,res)=>{
    try{
        const allClients = await Clients.find().populate("owner", "username -_id").exec()
        res.json(allClients);
    }catch(err){
        res.status(400).json(err);
    }
});

//Client show route
router.get("/:id", async (req,res,next)=>{
    try{
        const myClient = await Clients.findById(req.params.id)
            .populate("owner")
            .exec();
        res.json(myClient)
    }catch(err){
        console.log(err)
        next();
    }
})

//Create route
router.post("/", async (req,res)=>{
    try{
        res.json(await Clients.create(req.body))
    }catch(err){
        res.status(400).json(err);
    }
});

//Update route
router.put("/:id", async (req,res)=>{
    try{
        res.json(await Clients.findByIdAndUpdate(req.params.id, req.body, {new:true}));
    }catch(err){
        res.status(400).json(err);
    }
})

//Delete route
router.delete("/:id", async(req,res)=>{
    try{
        res.json(await Clients.findByIdAndRemove(req.params.id));
    }catch(err){
        res.status(400).json(err);
    }
})

module.exports = router;


