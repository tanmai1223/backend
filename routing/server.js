const express=require("express");
const app=express()
const main=require('./routers/main')
const admin=require('./routers/admin')

app.use(express.json())

app.use('/',main)
app.use('/admin',admin)

app.listen(3000,()=>{
    console.log(`Your app is running on http://localhost:3000`)
})