const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const userSchema = new mongoose.Schema({
    email : String,
    username : String,
    password : String,
    Notes : [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note' 
    }] 
})

module.exports = mongoose.model("user" , userSchema);