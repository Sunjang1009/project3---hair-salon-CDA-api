const mongoose = require('../config/connection');

const clientSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "We need a client's name!"],
        unique: true
    },
    image : {
        type:String
    },
    email : {
        type: String,
        required : [true, "We need an email address from client!"],
        unique : true
    },
    phoneNumber : {
        type : String,
        required : [true, "We need a phone number!"]
    },
    hairStyle : {
        type:String
    },
    service : {
        type : String
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }

},{
    timestamps:true
});

const Clients = mongoose.model("Client", clientSchema);

module.exports = Clients;
