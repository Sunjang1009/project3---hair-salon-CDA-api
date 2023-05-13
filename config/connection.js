require("dotenv").config();
const mongoose = require("mongoose");
const { MONGODB_URL } = process.env;

mongoose.connect(MONGODB_URL);

mongoose.connection.on("connected", ()=>{
    console.log(`[${new Date().toLocaleTimeString()}] - MongoDB connected .. ଘ(੭ºัᴗºั)━☆ﾟ*:.`);
});

mongoose.connection.on("error", (err)=>{
    console.log(err)
});

mongoose.connection.on("disconnected", ()=>{
    console.log(`disconnected from MONGO_DB .. ε=ε=┏( ・＿・)┛ `);
});

