const mongoose=require('mongoose')

const FolderSchema=new mongoose.Schema({
    Folders:{
        type:Array,
        default:[]
    },
    Files:{
        type:Array,
        default:[]
    },
    Folderid:{
        type:String,
        required:true,
        unique:true
    },
    Name:{
        type:String,
        required:true
    },
    uid:{
        type:String,
        required:true
    }
})

const FolderModel=new mongoose.model('Folders',FolderSchema)
module.exports={FolderModel}