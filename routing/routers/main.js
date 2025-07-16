const express=require("express")
const app=express()
const routers=express.Router();
const isAuthenticated=require('../middleware/auth')
const logger=require('../middleware/logger')

app.use(logger)

routers.get('/',(req,res)=>{
    res.send("Hello world from main")
})

routers.get('/dashboard',isAuthenticated,(req,res)=>{
    res.send("This is the dashboard")
})

module.exports=routers;