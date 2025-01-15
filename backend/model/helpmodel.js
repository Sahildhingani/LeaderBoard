// user help model 

// user collection 

const mongoose=require("mongoose");

const HelpSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
    },
    Tittle:{
        type:String,
        required:true,
    },
    Report:{
        type:String,
        required:true,
    }
});

// model 

const Help=mongoose.model("LeaderHelp",HelpSchema);

// let work ("check leet user id is right or not ");

module.exports=Help;