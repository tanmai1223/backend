const http=require("http")

const information=[]

const server=http.createServer((req,res)=>{
    if(req.method==="POST" && req.url==="/posts"){
        let data=""

        req.on("data",(chunk)=>{
            data += chunk;
        })

        req.on("end",()=>{
            try{
                const postData=JSON.parse(data)
                information.push(postData)
                res.writeHead(200,{"Content-Type":"application/json"})
                res.end(JSON.stringify({
                    status:true,
                    data:postData,
                    timeStamp:new Date().toISOString()
                }))
            }catch(error){
                res.writeHead(400,{"Content-Type":"application/json"})
                res.end(JSON.stringify({
                    status:false,
                    message:"Invalid JSON"
                }))
            }
        })
   }
   else if(req.method==="GET" && req.url==="/posts"){
    res.writeHead(200,{"Content-Type":"application/json"})
    res.end(JSON.stringify({
        status:true,
        data:information,
        timeStamp:new Date().toISOString()
    }))
   }
   else{
    res.writeHead(400,{"Content-Type":"application/json"})
    res.end(JSON.stringify({
        status:false,
        message:"Error"
    }))
   }
})

server.listen(3001,()=>{
    console.log(`This link is running on localhost:3001`)
})