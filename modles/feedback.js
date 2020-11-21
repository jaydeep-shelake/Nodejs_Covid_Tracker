const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let feedback= new Schema({
    name:{
        type:String,
        required:true,
        default:''
    },
    email:{
        type:String,
        required:true,
        default:'',
    },
    comment:{
        type:String,
        required:false,
        default:''
    }},{
        timestamps:true
});

module.exports=mongoose.model('feedback',feedback)