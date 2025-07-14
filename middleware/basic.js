const express=require("express")
const app=express();

const myMiddleWare=(req,res,next)=>{
    console.log("Middleware is running")
    req.timeStamp=new Date().toISOString();
    next()
}

app.use(myMiddleWare);

app.get('/',(req,res)=>{
    res.send('Hello world at  '+req.timeStamp)
})

app.listen(3000,()=>{
    console.log(`Your code is running on http://localhost:3000`)
})