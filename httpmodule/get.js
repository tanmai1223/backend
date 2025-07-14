const http=require("http");

http.get("http://jsonplaceholder.typicode.com/posts/1",(response)=>{

    let data="";

    response.on("data",(chunk)=>{
        data += chunk;
    })

    response.on("end",()=>{
        console.log(JSON.parse(data));
    })
}).on("error",(err)=>{
    console.error(err);
})