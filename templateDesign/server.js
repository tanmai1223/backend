const express=require("express")
const path=require("path")
const app=express()

app.set("view engine","pug")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',(req,res)=>{
    res.render('index',{
        title:"My website",
        content:"This is the my wesite",
        footer:"This is the footer of my website"
    })
})


app.listen(3000,()=>{
    console.log(`Your code is running on http://localhost:3000`)
})