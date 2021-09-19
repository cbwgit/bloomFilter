const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },
   
    university: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },
    userDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports= mongoose.model('User', userSchema);


