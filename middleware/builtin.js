const express=require("express")
const path=require("path")
const app=express()


//express.json

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))

app.post('/product',(req,res)=>{
   console.log(req.body)
   res.json({"message":"data added","data":req.body})
})

//urlencoded

app.post('/login',(req,res)=>{
    console.log(req.query)
    console.log(req.body)
    res.json({
        "message":"Added sucessfully",
        "Query params":req.query,
        "Body":req.body
    })
})

//static

app.get('/home',(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"))
})


app.listen(3000,()=>{
   console.log(`Your code is running on http://localhost:3000/product`)
})