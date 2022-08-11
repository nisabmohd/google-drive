const express=require('express')
require('dotenv').config()

const app=express()
app.use(require('cors')())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("hello")
})

app.listen(8000)