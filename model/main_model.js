const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mainSchema = new Schema({
    firstname :{
        type:String,
        require:true
    },
    lastname :{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phone:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }
}) 

const mainModel = mongoose.model('user',mainSchema);

// EXPORTS SECTION
module.exports = mainModel;