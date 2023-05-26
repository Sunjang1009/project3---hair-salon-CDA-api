const express = require("express");
const Clients = require('../models/Clients');
const router = express.Router();
const { handleValidateOwnership, requireToken } = require("../middleware/auth");

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
router.post("/", requireToken, async (req,res)=>{
    try{

        const owner = req.user._id
        req.body.owner = owner

        const newClient = await Clients.create(req.body)
        res.json(await Clients.create(newClient))
    }catch(err){
        res.status(400).json(err);
    }
});

//Update route
router.put("/:id", requireToken, async (req,res)=>{
    try{
        handleValidateOwnership(req, await Clients.findById(req.params.id))
        const updatedClient = await Clients.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new:true}
        )
        res.status(200).json(updatedClient);
    }catch(err){
        res.status(400).json({ err : err.message });
    }
})

//Delete route
router.delete("/:id", requireToken, async(req,res)=>{
    try{

        handleValidateOwnership(req, await Clients.findById(req.params.id));
        const deletedClient = await Clients.findByIdAndRemove(req.params.id);

        res.status(200).json(deletedClient);
    }catch(err){
        res.status(400).json({err:err.message});
    }
});

router.get("/logout", requireToken, async ( req,res,next)=>{
    try{

        const currentUser = req.user.username
        delete req.user
        res.status(200).json({
            message: `${currentUser} currently logged out`,
            isLoggedIn : false,
            token: "",
        })

    }catch(err){
        res.status(400).json({err:err.message})
    }
})


module.exports = router;


