const EventEmitter = require("events");
const event = new EventEmitter();

//without arguments

event.on("greet", () => {
  console.log("Hello everyone!");
});
event.on("greet", () => {
  console.log("Welcome everyone!");
});
event.emit("greet");

//with arguments

event.on("userInfo", (name, age) => {
  console.log(`Name : ${name} & Age : ${age}`);
});
event.emit("userInfo","tanmai","23");

//once an on difference

event.on("firstConnection",()=>{
    console.log("This is first call")
})
event.emit("firstConnection")
event.emit("firstConnection")
event.once("secondConnection",()=>{
    console.log("This is second call")
})
event.emit("secondConnection")
event.emit("secondConnection")

//higher order functions

console.log("Start")
event.on("functions",()=>{
     console.log("Hello")

})
event.emit("functions")
console.log("End")

console.log("Start")
event.on("function",()=>{
    setImmediate(()=>{
        console.log("Hello")
    })
})
event.emit("function")
console.log("End")




