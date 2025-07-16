const express=require("express")
const path=require("path")
const app=express()
const userRouter=require('./routes/routers')

app.set("view engine","pug")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',userRouter)




app.listen(3000,()=>{
    console.log(`Your code is running on http://localhost:3000`)
})