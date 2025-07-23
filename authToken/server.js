const express=require("express")
const mongoose=require("mongoose")
const routers=require('./routes/loginRoutes')


const app=express();

app.use(express.json())

mongoose.connect("mongodb+srv://htanmai23:VrFPFThXhoCFj9pN@cuvette.4goceku.mongodb.net/?retryWrites=true&w=majority&appName=Cuvette").then(()=>{
    console.log("Connected to database")
}).catch((err)=>{
    console.log(err)
})

app.use('/',routers)



app.listen(3000,()=>{
    console.log(`Your app is running on http://localhost:3000`)
})