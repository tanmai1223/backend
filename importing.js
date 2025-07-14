//core modules 

const fs=require("fs")

fs.readFile("example.txt","utf8",(err,data)=>{
    if(err) throw err;
    console.log("Content in file is:",data);
})

//local modules

function privateFunc(){
    console.log("This is a private function");
    return ;
}

function greet(name){
    return (`Good Morning ${name} !!` )
}

function product(a,b){
    return a*b;
}

module.exports={
    privateFunc,
    greet,
    product
}
