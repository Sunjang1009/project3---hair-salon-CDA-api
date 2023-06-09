require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const clientsRouter = require("./controllers/clients");

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/clients", clientsRouter)
//routes
app.get("/", (req,res)=>{
    res.send("Hello World");
})

app.listen(PORT, ()=>{
    console.log(`Listening on PORT ${PORT}`);
});


