const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    uid:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String
    },
    mainFolder:{
        type:String,
        unique:true
    },
})

const UserModel=new mongoose.model('Users',UserSchema)

module.exports={UserModel}