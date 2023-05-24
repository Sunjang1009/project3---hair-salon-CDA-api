const mongoose = require('../config/connection');

const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            required : true,
            unique : true
        },
        password : {
            type : String,
            required : true
        }
}, {
    timestamps : true
}
);

module.exports = mongoose.model("User", userSchema);

