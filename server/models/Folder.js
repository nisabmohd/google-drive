const mongoose=require('mongoose')

const FolderSchema=new mongoose.Schema({
    Folder:{
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
})

export const FolderModel=new mongoose.model('Folders',FolderSchema)