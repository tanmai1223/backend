const express=require("express")
const app=express()

app.use(express.json())

let products=[
    {id:1,name:"products1",price:100},
    {id:2,name:"products2",price:200},
    {id:3,name:"products3",price:300},
    {id:4,name:"products4",price:400},
    {id:5,name:"products5",price:500}
]

app.get('/products',(req,res)=>{
    res.json(products)
})

app.get('/products/:id',(req,res)=>{
    const productid=parseInt(req.params.id)
    const product=products.find(p=>p.id===productid)
    if(!product) return res.status(404).json({"message":"data not found"})
    res.json(product)
})

app.post('/products',(req,res)=>{
    const newProduct={id:products.length+1,...req.body}
    products.push(newProduct)
    res.status(201).json(newProduct)
})

app.listen(3000,()=>{
    console.log(`Your application is running on http://localhost:3000/products`)
})
