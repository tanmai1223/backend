const fs = require("fs");
const fspromises = require("fs").promises;
//syschronuous
try {
  const data = fs.readFileSync("Example.txt", "utf8");
  console.log(data);
} catch (err) {
  console.log(err);
}
try {
  fs.writeFileSync("newFile.txt", "Hello and welcome everyone", "utf8");
  console.log("File written!!!");
} catch (err) {
  console.log("Error :", err);
}
try {
  fs.appendFileSync("newFile.txt", " Why did you come here?", "utf8");
  console.log("File appened!!!");
} catch (err) {
  console.log("Error :", err);
}
//asynchronuous

fs.readFile("Example.txt", "utf8", (err, data) => {
  if (err) {
    console.log("Error :", err);
    return;
  } else {
    console.log("Data : ", data);
  }
});
fs.writeFile("found.txt", "We are here to learn node ", "utf8", (err) => {
  if (err) {
    console.log("Error : ", err);
    return;
  }
});
fs.appendFile("found.txt", " Lets start", "utf8", (err) => {
  if (err) {
    console.log("Error : ", err);
    return;
  }
});
//asynchronous promise based
async function readFileOperation() {
  try {
    const data = await fspromises.readFile("Example.txt", "utf8");
    console.log("Data :", data);
  } catch (err) {
    console.log("Error :", err);
  }
}
readFileOperation();
async function writeFileOperation() {
  try {
    await fspromises.writeFile(
      "Find.txt",
      "This is a async await concept file",
      "utf8"
    );
    console.log("File created!!");
  } catch (err) {
    console.log("Error :", err);
  }
}
writeFileOperation();
async function appendFileOperation() {
  try {
    await fspromises.appendFile(
      "Find.txt",
      " This is the append function!!",
      "utf8"
    );
    console.log("File Appended!!");
  } catch (err) {
    console.log("Error :", err);
  }
}
appendFileOperation();
