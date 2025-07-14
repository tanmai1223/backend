const http=require("http")
const fs=require("fs")
const path=require("path")

const server=http.createServer((req,res)=>{
    if(req.url==="/" || req.url==='/index.html'){
        serverStaticFile("index.html",res)
    }else if(req.url==="/about" || req.url==='/about.html'){
        serverStaticFile("about.html",res)
    }
})

function serverStaticFile(filename,res){
    const filepath=path.join(__dirname,"public",filename)
    fs.readFile(filepath,(err,data)=>{
        if(err){
            res.writeHead(400,{"Content-Type":"text/html"})
            res.end("<h1>404 Page Not Found</h1>")
        }else{
            res.writeHead(200,{"Content-type":"text/html"})
            res.end(data)
        }
    })
}

server.listen(3003,()=>{
    console.log(`JSON is running on http://localhost:3003`)
})