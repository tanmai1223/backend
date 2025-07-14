const  express=require("express")
const app=express();

const requestLogger=(req,res,next)=>{
    console.log(`[${new Date().toISOString()}],${req.method},${req.url}`)
    console.log("Header",req.headers)
    console.log("Body",req.body)
    next()
}

app.use(requestLogger)

app.get('/products',(req,res)=>{
    res.json([{
        "id":1,
        "name":"product1",
        "price":100
    }])
})

app.listen(3000,()=>{
    console.log(`Your code is running on http://localhost:3000/products`)
})