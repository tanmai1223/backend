const fs=require("fs")

console.log("Starting the executions")

fs.readFile("example.txt","utf8",(err,data)=>{
    if(err) throw err;
    console.log("Data is :",data)
})

console.log("Reamining code in the file")